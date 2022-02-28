# Drivencracy

A pool creator API writen with Node.js.

# About this project

I have written this project to get more experience coding with Node.</br>
I'll be glad you provide me some feedback.

# Technologies

Node.js</br>
MongoDB</br>
REST</br>

# How to use

Create a poll:</br>
  POST</br>
   route: /pool</br>
   Schema: </br>
   {</br>
      title: "Which languange is the most useful?",</br>
      expireAt: "2022-02-28 01:00" </br>
    }</br>
    
Get all polls</br>
  GET</br>
  /pool</br>
  
Create the options of polls</br>
  POST</br>
  /choice</br>
  Schema:</br>
  {</br>
    title: "JavaScript",</br>
		poolId: 2,</br>
  }</br>
Get the choices of a poll</br>
  GET</br>
  /pool/:id/choice</br>
Post a voto</br>
  POST</br>
  /choice/:id/vote</br>
Get the result</br>
  GET</br>
  /pool/:id/result</br>
  



