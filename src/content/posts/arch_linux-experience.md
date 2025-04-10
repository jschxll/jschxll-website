---
title: My Arch Linux experience
pubDate: 2024-07-23
description: So I had an old ThinkPad T510 lying around in my room and I wondered what I could do with it. The BIOS was last updated in 2012 and the preinstalled Windows 10 ran on a 2.5 HDD with a capacity of 160GB. As expected, the Windows experience was terrible, especially when considering the whole machine runs with 4GB of RAM. Here is my experience with the installation of Arch Linux.
---

So I had an old ThinkPad T510 lying around in my room and I wondered what I could do with it: The BIOS was last updated in 2012 and the preinstalled Windows 10 ran on a 2,5" HDD with a capacity of 160GB. As expected, the Windows experience was terrible, especially when considering the whole machine runs with 4GB of RAM. First, it was clear I had to replace the HDD with a decent 2,5" SATA SSD. The mounting process was very easy: all I had to do was unscrew an extra lid from the backplate of the laptop and I had directly access to the SATA slot. Next, I looked up whether the battery, which you can unplug when pressing a bottom on the back of the laptop, was in good condition and well, it should hold surprisingly long: The BIOS diagnostic program promised a minimum runtime of 3 hours. But I will tell you more later.

## What Linux Distro to choose from?

It was clear that I had to run a Linux Distro on the ThinkPad to make using it enjoyable. But which one should I choose from what feels like five thousand distros?<br>
I originally planned on using AntiX Linux, a very lightweight Linux distribution, but a quick look in the live environment showed me that I'm not a huge friend of the overall look of XFCE. And yes, I know I could easily install another desktop or window manager, but in the meantime, I had a better idea: Why not install Arch Linux? I read much of it, and according to many people on Reddit and YouTube, it should be, besides Gentoo and Linux from Scratch, the Linux distro with the highest learning curve. Above all, there is the installation process itself.

## How do I install Arch?

Sometimes I make my life harder than it is because I chose to install Arch without the `archinstall` script and do it myself. <br><br>
So I went to the Arch Wiki and looked up the official installation guide. I was a bit surprised by the fact that the standard installation is only five steps with a couple of substeps long because, according to the reputation that Arch has, I thought it was a much more difficult approach. <br>
And the first steps were truly easy to following along: Setting up a WLAN connection with `iwctl`, a timezone with `timedatectl` and changing the keyboard layout to German with the `loadkeys` CLI, was set up with the help of the Wiki in ten minutes.

### Partitioning the drive

The partitioning process was a bit more complicated. When using BIOS, you have to make an MBR partition table and when using UEFI, a GPT partition table. In general, with **fdisk** it was a breeze. You add your drive as the program argument of fdisk, i.e. `fdisk /dev/sda`, and make the changes you want within the fdisk CLI. Next, after I had a root and a swap partition, it was time to format them. For the root file system I selected the standard EXT4 formatting and initialize the swap partition with `mkswap`.

### Install essential packages

After partitioning the drive, I installed essential packages like the Linux kernel, Linux firmware, the NetworkManager, iwd and nano, to edit configuration files, like in the next section. The reason I added nano and the NetworkManager is that after the installation is done, all packages that were preconfigured in the live image won't be ported to the new file system I made.

### Changing root to the new system & installing GRUB

The next couple of steps I followed along were changing root into the new mounting point of my new root file system and making the configurations I made on the live image persistent, like the system language, keyboard layout or the hostname, to make it recognizable in the network. Additionally, I already created a new user within the wheel group in order to gain root rights if necessary.
<br><br>
And then it begins, where I commit a big mistake. I didn't install the GRUB bootloader._. And well, after I rebooted the system, I wondered why I saw only a white strip blinking on the display where the GRUB bootloader should have appeared. Then I read the complete installation guide again and had to repeat all the steps from before to install GRUB because the configuration wouldn't be saved on the live image. But after I installed and created a GRUB configuration file with the `grub-mkconfig` command and spent one hour of troubleshooting, I was finally able to boot into Arch Linux.

## The problems continued ...
After I wanted to update the pacman mirrors, I encountered another problem. The system couldn't establish an Internet connection. I tried to use iwctl, but it didn't work because it waited for the iwd service, which I had to enable and start with systemctl. Although iwctl showed me that I was connected to my WLAN, I wasn't able to ping any servers. <br>
After, one more time of reading the Arch Wiki, I found out, that I haven't enabled and started the NetworkManager service, systemd-networkd as well as systemd-resolved. **And suddenly it worked!**

## Finding a desktop environment
The only thing which was missing was a desktop environment, to gain the best Linux desktop experience. <br>
Firstly, I thought Gnome would be a bottleneck on my ThinkPad T510 because it has an Intel Core I7 620M, with only a maximum of 8GB of RAM and two cores that have a base clock of 2,66GHz. But surprisingly, Gnome ran very smoothly and used only 1GB of RAM. 

## Conclusion
So what are the benefits of running Arch Linux, besides you are now allowed to say: "I use Arch, btw"? I really liked the lightweight base system of Arch, which you can customize for your needs and it's great for people who like to tinker around with their computer. The rolling release model is a great feature too. You are always on the cutting edge and get the newest bug fixes. Although it is stable, I have the feeling that it isn't as reliable as Fedora or Debian and that's why I wouldn't like to run it as my daily driver. But maybe, I'm just paranoid that one day I'll break my PC.