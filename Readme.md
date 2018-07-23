<p align="center">

<h1 align="center"> Working on Linux  (Ubuntu 16.04).</h1>

<h1> How to install Visual Studio Code on Linux Ubuntu 16.</h1>

<p>Install Visual Studio Code on Ubuntu 16.04 

Debian and Ubuntu based distributions
The easiest way to install for Debian/Ubuntu based distributions is to download and install the <i>.deb package (64-bit)</i>,from the 
<a href="https://code.visualstudio.com/docs/setup/linux"> Visual Studio Code, official website.</a><break>

<p> After you downloaded the .deb package from the beginning of the page, then right click on the desktop and open a terminal: 
    <img src=1.png" width="">
    

<p> Go to the Download directory.  Type cd Dow and hit the tab key to complete the directory name:
    <img src=2.png" width=""> 

<p> Type ls to list the files in the Download directory and find the code_ package:
        <img src=3.png" width=""> 

<p> Install the package with this command sudo dpkg –i code (and hit tab to complete the name):
        <img src=4.png" width=""> </p>
        

<p> Provide your password and Visual Studio Code will install.

<bold>NOTE</bold>: if you get dependency errors when using dpkg with a package, simply type sudo apt-get install –f  which will download and install missing dependencies and configure them.

Now, find it and run it:</p>
    <img src=5.png" width=""> </p>

<p>And you can right click on the icon in the side bar (Launcher) and choose Lock to Launcher so you don’t need to hunt for it again!
             <img src=6.png" width=""> </p>   


