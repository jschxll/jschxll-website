+++
title = "Run LLMs locally"
date = "2024-05-05"
description = "Running open source LLMs on you local machine isn't anymore a dream. With Ollama and the OpenUI, you can run and modify LLMs for your needs and preferences in a decent web interface."
tags = ["linux", "homeserver", "docker", "ollama"]
+++

How to Run Open-Source LLMs on a Local Computer Without Compromising on a Specific Use Case? Today, I will show you how to run LLMs locally on a computer or home server using Ollama in combination with the OpenUI web interface.
<br>
<br>

## What is Ollama?

First, Ollama is an engine that allows you to run Large Language Models (LLMs) on your own computer, so no personal data from sessions, like those in ChatGPT, is sent to companies. Instead, the data stays on the PC and runs on your own hardware. You can download officially supported LLMs from Microsoft, Mistral, and even Meta, which you can customize with model files to suit your needs. With the Ollama WebUI, features like RAG (Retrieval-Augmented Generation) are directly integrated, allowing you to upload your documents, such as PDFs, to provide a new data source for the AI to consider in its next response. Additionally, websites and images can be inserted into a prompt so you can formulate your questions on current websites and multimodal LLMs like Llava can recognize images.

### Requirements

Although Ollama can also run on a CPU, I would recommend a good GPU. I run all my Large Language Models on an NVIDIA RTX 3060, but an AMD graphics card is also a good choice.

## Installation

Visit the <a style="color: #03DAC6;" target="_blank" href="https://ollama.com/">Ollama</a> website and click on Download. Linux and macOS are fully supported, but the Windows preview is also usable (I use this myself).<br>
Open the terminal, paste the command for the installation script, and run it. That's it! Now we want to download the web interface to have a better experience and more features. For this, you need to have Docker installed. If Docker is not installed on your PC, follow the steps on the <a style="color: #03DAC6;" target="_blank" href="https://docs.docker.com/get-docker/">official Docker website</a>.
<br>
Finally, we will install Ollama WebUI. Enter this command in the terminal:<br> `sudo docker run -d -p 3000:8080 --add-host=host.docker.internal:host-gateway -v open-webui:/app/backend/data --name open-webui --restart always ghcr.io/open-webui/open-webui:main`<br> and press ENTER. Now the Open WebUI image should be pulled from the Docker Hub. To check whether the container is running as expected, copy the command into your terminal: sudo docker ps. <br><br>
Now open <a style="color: #03DAC6;" target="_blank" href="http://localhost:3000/">localhost</a> and create a new Ollama WebUI account. This step is important because different users can be created in the local instance and the first user has administrator rights.

## Quick Overview of Ollama WebUI

Once everything is set up, it's time to install the first LLM on your computer. To get an idea of which model you want to run, there is an overview of every available LLM on the Ollama website. To install a model, run this command: ollama run followed by the name of the model. Once Ollama has downloaded the model, refresh the Ollama WebUI, where the model will now be displayed. Click on the dropdown menu and select the model you want to chat with.<br>

### Adding Websites and Documents to Prompts

As mentioned earlier, websites and documents can be added to prompts. To do this, type “#” followed by the corresponding web address or document you want the LLM to consider. Documents can also be added by pressing the “+” button next to the text field.
<br>
<br>
Now that you understand the basics of Ollama and the web interface, it's time to explore the possibilities with local LLMs and Ollama WebUI.
