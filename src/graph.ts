import Graph from "graphology";
import { circular } from "graphology-layout";
import Sigma from "sigma";
import { TreeNode } from "./TreeNode";

const notes = Object.entries(
  import.meta.glob("./content/notes/**/*.md", { eager: true })
).map(([path, note]) => {
  const slug = path.replace("./content/notes/", "").replace(".md", "").toLowerCase().replaceAll(" ", "-");
  return {
    ...note,
    url: `/${slug}`,
    title: note.frontmatter.title,
  };
});

const noteMap = new Map(
  notes.map((note) => [note.url.split("/").pop(), note.url])
);

function traverseTree(node: TreeNode, graph: Graph) {
  if (node == null) return;

  for (let child of node.getChildren()) {
    const url = noteMap.get(child.val) ?? null;
    graph.addNode(child.val, {
      label: child.val,
      size: child.getChildren().length * 5 || 5,
      url: url != null ? `/notes${url}` : null,
      color: child.getChildren().length != 0 ? "#8bb386" : "#ba794a", // different color, if child has children/is a directory
    });

    graph.addEdge(node.val, child.val, { size: 2 });
    traverseTree(child, graph);
  }
}

function buildGraph() {
  const rootNode = new TreeNode("home");
  for (let note of notes) {
    const parts = note.url.split("/").slice(1);
    rootNode.addChild(parts);
  }

  const graph = new Graph();
  const tagSet = new Set<string>();

  graph.addNode("home", {
    label: "home",
    size: 10,
    color: "red",
    url: "/",
  });

  traverseTree(rootNode, graph);

  // Add tags to the graph
  for (let note of notes) {
    const noteSlug = note.url.split("/").pop();
    const tags = note.frontmatter.tags || [];

    for (let tag of tags) {
      tagSet.add(tag);

      // Add the tag node if it doesn't exist
      if (!graph.hasNode(tag)) {
        graph.addNode(tag, {
          label: tag,
          size: 8,
          color: "#ffd369",
          url: `/tags/${tag}`
        });
      }

      if (noteSlug && graph.hasNode(noteSlug))
        graph.addEdge(noteSlug, tag, { size: 1 });
    }
  }

  circular.assign(graph);

  graph.setNodeAttribute("home", "x", 0);
  graph.setNodeAttribute("home", "y", 0);

  return graph;
}

const container = document.getElementById("container") as HTMLElement;
const zoomInBttn = document.getElementById("zoom-in") as HTMLElement;
const zoomOutBttn = document.getElementById("zoom-out") as HTMLElement;
const resetZoomBttn = document.getElementById("reset-zoom") as HTMLElement;

requestIdleCallback(() => {
  const graph = buildGraph();
  const renderer = new Sigma(graph, container);
  const camera = renderer.getCamera();

  /* set properties of action buttons */
  zoomInBttn.addEventListener("click", () => {
    camera.animatedZoom({ duration: 600 });
  });

  zoomOutBttn.addEventListener("click", () => {
    camera.animatedUnzoom({ duration: 600 });
  });

  resetZoomBttn.addEventListener("click", () => {
    camera.animatedReset({ duration: 600 });
  });

  /* add links to each node */
  renderer.on("clickNode", ({ node }) => {
    if (graph.getNodeAttribute(node, "url") != null)
      window.open(`${graph.getNodeAttribute(node, "url")}`, "_self");
  });
});