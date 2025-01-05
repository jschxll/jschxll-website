+++
title = "Building an own cloud"
date = "2024-04-28"
description = "How I run Photoprism on my own homeserver to backup my photos without sharing my data with third parties"
tags = ["linux", "homeserver", "photoprism", "docker"]
+++

In recent weeks, I have been using my own cloud to back up my photos and videos from my smartphone and laptop by using a containerized Photoprism instance. Today, I want to share how I set up my server and Docker environment to get everything running.<br><br>

## Installing the Server's Operating System

First, you should use a separate computer so your own cloud is always accessible when you need to access your photos. I had an old laptop lying around that I used, but you can also use a cloud server. To make management easier, Ubuntu Server is a good choice. That's why I used it to run my photo cloud. Download Ubuntu Server on [this site](https://ubuntu.com/download/server) by clicking the download button.

Next, after the ISO file is downloaded, you need to flash the file onto a USB stick. To do this, download the BalenaEtcher tool. Once BalenaEtcher is successfully installed on your system, it's time to flash the ISO file onto the USB stick. Open BalenaEtcher, select "Flash from File," and find your downloaded ISO. Then select your USB stick and press "Flash!". This process can take some time, so be patient. After the flashing process, you will receive a message indicating that you can remove your USB stick.{{<line-break>}}
Now it's time to install Ubuntu on your server. Insert the boot device (the USB stick) into your computer that will be used as a server and press ESC during boot. In the displayed menu, you should see the name of the USB stick, that you want to select by pressing ENTER. If the first boot doesn't work, please check in the BIOS if Secure Boot is disabled and try again. {{<line-break>}}
Now follow the instructions in the Ubuntu Server installation menu. Make sure to enable the OpenSSH client during the installation so we can interact with our server later.

## Post Installation

After installing Ubuntu on your server, it's time to install the services we need to create a private cloud. But first, we need to access our server. We can use SSH for this. So open the terminal on your device (not the server) and enter:{{<line-break>}}
```bash
ssh YOUR_USER_NAME@SERVER_IP_ADRESS
```
{{<line-break>}}
Now you have full access to your server. At first, make sure your package manager is up to date. Run therefore 
```bash
sudo apt-get update && sudo apt-get upgrade -y
```
to update your mirror's repositories.

## Installing Docker and Photoprism

You can easily install Docker with those commands taken from the [official docker installation guide](https://docs.docker.com/engine/install/ubuntu/):
```bash
# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
```
Now we added docker in our apt mirror list and should install docker packages via:
```bash
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```
For convenience, we will use the docker-compose-plugin to deploy the Photoprism instance with a simple YAML file. You can check if the installation was successful by displaying the Docker Compose version with `docker compose version`.{{<line-break>}}
After installing Docker Compose, we can finally install the Photoprism image. I have already prepared a docker compose file which you can use if you like.{{<line-break>}}
```bash
git clone https://github.com/j-schall/photoprism-docker-compose.git
```
Feel free to costumize the file for your needs, but I would strongly recommend setting stronger passwords. Therefore, pay special attention when setting up your *PHOTOPRISM_USER_PASSWORD*. It needs to be the same as *MARIADB_USER_PASSWORD* and the username too.
<br><br>
Now direct to the folder where you saved the cloned docker-compose.yml file and execute it (`sudo docker compose up -d`). Check the container status with: `sudo docker ps `. If all went successfully you should find your running container there.

## Setting Up Syncthing

If you have already opened the docker-compose file, you might have seen that Syncthing listens on port 8384. Open the Syncthing web interface, where you firstly have to set a strong password.
{{<line-break>}}
The next step varies. If you want to sync your photos and videos from your smartphone, download the Syncthing app from the Play Store. Unfortunately, there is no official Syncthing app for iOS yet. When you open the app, do the following:

1. Go to the device menu and press the + button.
2. Next to the text field for the device ID, there should be a QR code icon. Press it.
3. Go back to the Syncthing web interface of your server.
4. Press the actions menu < Device ID.
5. Scan the QR code with your Syncthing smartphone app and give it a name.
6. After a few seconds, a message should appear on the server's web interface where you confirm that it is your device.
7. Create a new folder in the smartphone app and link it to your photo directory.
   <br><br>
   Now the photos should be synced with your server.

## Introduction to Photoprism

Once the photos from your smartphone are synced with the Syncthing instance on your server, we only need to import them into Photoprism. To do this, log into the Photoprism web interface, where you will find the "Files" section on the right sidebar. Click "Import" and select all your folders. After this process, you should see all your photos from your smartphone. <br><br>

Congratulations 🎉 You have just built your own cloud!

## Tipps

### Use LAN Instead of WLAN

I would strongly recommend using LAN instead of Wi-Fi. It is more stable and faster for uploading and downloading files. Additionally, it is less complex during the Ubuntu Server installation process as it is recognized directly by Ubuntu.<br>

### Keep the Laptop Running When Closing the Lid

If you use a laptop as your server, it usually shuts down when you close the display. However, you can avoid this by following these configuration steps:<br>

1. Edit the file `/etc/systemd/logind.conf`
2. Change `#HandleLidSwitch=suspend` to `HandleLidSwitch=ignore`
3. Make sure the file contains the following: `LidSwitchIgnoreInhibited=no`
4. Restart the operating system with: `sudo service systemd-logind restart`
