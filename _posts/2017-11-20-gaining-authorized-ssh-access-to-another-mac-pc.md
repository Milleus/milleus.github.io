---
layout: post
title: "Gaining authorized SSH access to another mac PC"
date: 2017-11-20
---

One fine day at work, a co-worker left his laptop unlocked while going number one.

Looking at an unlocked computer, it made us wonder about what type of pranks we can pull on him. The possibilities are endless but to name a couple - we could mess with his terminal `ls` command so that every time he types `ls`, it echos `ls: command not found`. Alternatively, we could also modify the same command to run `ls` as per normal but also to echo `some_file`. This poor chap would be spending hours trying to figure out what's wrong.

This sparked off a seperate conversation - what if we could gain access to his mac PC without having to enter a password? Can you imagine how much more we can do? and thus, a script was created.

But first, let me introduce you to a girl known as Rebecca. Rebecca is the girl that all the guys want. She is the girl of your dreams. She is sexy, cute and out of your league. But for some reason, with all the guys out there, it seems like she only has eyes on you. Rebecca flirts with you constantly. Sometimes, she makes you feel happy when you get away with it. Over time, you tend to slowly let go and indulge in the special moments you have with her and.. one fine day at work, you leave your laptop unlocked while going number one.

You return to do your work only to find that something feels terribly wrong about your laptop. For some reason, it randomly launches Rick Roll on Google Chrome. It starts to annoy you, you goggle for solutions but to no avail. In frustration, you uninstall Google Chrome.. only to find that now it randomly launches Rick Roll on Mozilla Firefox.

By the way, if you haven't figured out, Rebecca goes by another name called Complacency. I've also named my script after her so that we don't forget her.

So how exactly does the script work? There are a couple of things that happen when the script is used.
1. Injecting your rsa public key into the authorized_keys of the victim's mac PC
2. Grabs the victim's hostname and IP address and sends it to an email address

So with everything in place, all that's left to do is to SSH in and play around with some commands. For a more detailed explanation, [click here](https://github.com/Milleus/rebecca){:target="_blank"}.

I guess the key takeaway from this is to always be vigilant. There is just too much shit that someone can do to you especially if they have malicious intent. So remember, the next time you decide to go number one, don't give in to Rebecca. She is out there to f*ck with you.
