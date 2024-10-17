+++
title = "Run yourself a cloud at home"
date = "2024-04-28"
description = "How I run Photoprism on my own homeserver to backup my photos without sharing my data with third parties"
tags = ["linux", "homeserver", "photoprism", "docker"]
+++

In recent weeks, I have been using my own cloud to back up my photos and videos from my smartphone and laptop by using a containerized Photoprism instance. Today, I want to share how I set up my server and Docker environment to get everything running.<br><br>

## Installing the Server's Operating System

First, you should use a separate computer so your own cloud is always accessible when you need to access your photos. I had an old laptop lying around that I used, but you can also use a cloud server. To make management easier, Ubuntu Server is a good choice. That's why I used it to run my photo cloud. Download Ubuntu Server on this <a style="color: #03DAC6;" target="_blank" href="https://ubuntu.com/download/server">site</a> by clicking the download button.

Next, after the ISO file is downloaded, you need to flash the file onto a USB stick. To do this, download the <a style="color: #03DAC6;" target="_blank" href="https://etcher.balena.io/">BalenaEtcher</a> tool. Once BalenaEtcher is successfully installed on your system, it's time to flash the ISO file onto the USB stick. Open BalenaEtcher, select "Flash from File," and find your downloaded ISO. Then select your USB stick and press "Flash!". This process can take some time, so be patient. After the flashing process, you will receive a message indicating that you can remove your USB stick.<br>
Now it's time to install Ubuntu on your server. Insert the boot device (the USB stick) into your computer that will be used as a server and press ESC during boot. In the displayed menu, you should see the name of the USB stick, which you now select by pressing ENTER. If the first boot doesn't work, please check in the BIOS if Secure Boot is disabled and try again. <br>
Now follow the instructions in the Ubuntu Server installation menu. Make sure to enable the OpenSSH client during the installation so we can interact with our server later.

## Post Installation

After installing Ubuntu on your server, it's time to install the services we need to create a private cloud. But first, we need to access our server. We can use SSH for this. So open the terminal on your device (not the server) and enter:<br>
`ssh YOUR_USER_NAME@SERVER_IP_ADRESS`<br>
Now you have full access to the server. First, update the repositories with: `sudo apt-get update && sudo apt-get upgrade -y` to have the latest mirrors.

## Installing Docker and Photoprism

You can easily install Docker with this command:<br> `sudo apt-get install docker.io`.<br> Then we want to install the Docker Compose plugin so we can deploy the Photoprism instance with a simple YAML file. To do this, enter:<br> `sudo apt-get install docker-compose-plugin`<br> and install the package. You can check if the installation was successful by displaying the Docker Compose version with the following command:<br> `docker compose version`.<br>
After installing Docker Compose, we can finally install Photoprism itself. For this, I have prepared a docker-compose.yml file that you can simply clone:<br>`git clone https://github.com/j-schall/photoprism-docker-compose.git`<br><br>
Modify the file to customize it and set strong passwords. Pay special attention when setting up your PHOTOPRISM_USER_PASSWORD. It must be the same as the MARIADB_USER_PASSWORD as well as the username.
<br><br>
Now go to the directory where you saved the cloned docker-compose.yml file and run it with: `sudo docker compose up -d` . Check whether the container is running with: `sudo docker ps `. There you will also find the port on which the Photoprism web interface is running.

## Setting Up Syncthing

If you have already opened the docker-compose file, you might have seen that Syncthing listens on port 8384. Open the Syncthing web interface by entering YOUR_SERVER_IP_ADDRESS:8384. There you can set a strong password.<br><br>
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

I would recommend using LAN instead of Wi-Fi. It is more stable and faster for uploading and downloading files. Additionally, it is less complex during the Ubuntu Server installation process as it is recognized directly by Ubuntu.<br>

### Keep the Laptop Running When Closing the Lid

If you use a laptop as your server, it usually shuts down when you close the display. However, you can avoid this by following these configuration steps:<br>

1. Edit the file `/etc/systemd/logind.conf`
2. Change `#HandleLidSwitch=suspend` to `HandleLidSwitch=ignore`
3. Make sure the file contains the following: `LidSwitchIgnoreInhibited=no`
4. Restart the operating system with: `sudo service systemd-logind restart`
