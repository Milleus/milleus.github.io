---
layout: post
title: "Why do we stop at vendor locked-in"
date: 2018-11-07
---

Months ago, the team was working on technical spikes, exploring viable architecture solutions to a problem we're trying to solve. A couple of people were assigned to explore whether to use AWS EC2 or AWS Lambda. It was determined that if we were to use AWS Lambda, we would be vendor lock-in. Nobody questioned it, we just accepted it and moved on.

Recently, there's been talks about using AWS Lambda again given that all we're running is just dockerised container with only one function on AWS EC2 and we really don't need it up 24/7 as our incoming traffic is low. After experimenting with Lambda, I am convinced that this is what we should be using instead. Much time and effort has been wasted setting it up on AWS EC2 when it could be done in a couple of hours on AWS Lambda.

Why did we stop at vendor locked-in? Do people really understand the concept of vendor locked-in? Do we really look deeper into switching costs? Moving forward, perhaps we should ask questions like "what do you mean by vendor locked-in?", "can you explain what is the estimated switching costs or effort?". I think these are questions worth asking so that we can make the better informed decisions.
