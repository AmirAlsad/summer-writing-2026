---
title: "Rifle vs. Nuke Pt.3"
description: "Finally pointing the framework at AI."
date: 2026-06-24
pinned: false
image: ""
image_caption: ""
reading_time: ""
---

## AI Isn't One Thing

Last piece, we explored how the case of gene splicing pushed us to stop classifying the technology and start classifying the use. AI is the ultimate version of that problem. A frontier model isn't a rifle or a nuke. It's a general-purpose engine with a **bunch** of different uses hanging off it, and only some of them are the offense-capable things this framework even talks about. A model writing your emails or summarizing a PDF doesn't meet that minimum. The most obvious dangers that everyones talking about are cyber (the model finding and exploiting security holes) and bio (the model helping someone toward a pathogen). Those are the dangers we'll focus on.

People hear "AI risk" and picture the machine waking up, deciding it doesn't need us, and taking over. To be clear, I think that's exaggerated and kind of silly. These models behave the way we push them to behave. The real version of the worry isn't that the model starts thinking for itself. It's that it faithfully carries the interests of whoever built and shaped it, which might be a pretty narrow set of views getting sold to everybody as if they belonged to everybody. It's a genuine concern. Power piling up in too few hands. Alas, that's not the problem that I'm focusing on.


## Open vs. Closed

Before the grading, there's one new wrinkle within the framework that has to be settled. Last piece's truck showed that you can't always cut a weapon out of the thing it's bolted to. AI is the extreme case. The "weapon" here isn't a part you can remove. It's the exact same reasoning that does the harmless work. The model that can walk a customer through a refund is, underneath, the same model that can walk someone through a dangerous synthesis. You can't ship one without shipping the other, because they aren't two things. They're one thing pointed in two directions.

Researchers have tried to get these models to forget their learnings about the dangerous parts, but it hasn't turned out well. What we're currently seeing at the frontier is external (meaning beyond the model) classifier models that determine if the input should even get to the model. I could dive deeper, but I'll digress for the purposes of this piece. May explore it later on.

So, we can't just cut off the pieces of the model that make it offense capable, at least not yet. The best anyone can do is put a guard in front of it. With that, when run through the framework, the open-versus-closed weights disupute isn't an ideological argument anymore. It's an argument about whether that guard survives. We have to assume that, in the case of the model being a nuke-class weapon (of which I'll speak on in just a bit), it shouldn't be available to the general public (and I think this is a very reasonable assumption).

Keep the model closed and the guard holds. And, bonus, the company gets to watch (or surveil) who's trying to misuse it. Open the weights and the guard is gone, because stripping the guardrails off an open model is cheap and easy, and at that point you've handed the unrestricted version to everyone.


## The Snapshots

To be reasonable about how we grade AI in the context of the framework, we'll do it at three different times: where we were, where we are, and where we're headed.

Two years ago is the easy one, because we already know the answer. The best models could barely finish beginner-level hacking puzzles, and on bio they gave you basically nothing you couldn't get from a search engine. So, back then, the cyber-end risk was real but seriously low (a recoverable, dual-use thing sitting at the bottom of its range) and the bio tail was dormant. Nothing the 2024 models could do put it anywhere near the nuke-class bucket.

Now. The frontier (Mythos) is, by its own maker's description, "the strongest cyber model in the world." Pointed at it, it found and exploited fresh vulnerabilities in every major operating system and browser, including a flaw that had been hiding in OpenBSD (a system people choose specifically *because* it's secure) for twenty-seven years, and it wrote a working remote-takeover exploit off a seventeen-year-old bug. But it's not just lab stuff. We're starting to see state-sponsored groups run autonomous (or mostly-autonomous to be precise) espionage campaigns. So, cyber has climbed from the bottom of the dual-use bucket to the top, and it's now standing right at the line I flagged a couple pieces ago, the one where recoverability flips. What does it mean for recoverability to flip? Think of a punch. Normally, people would recover from one. But if the punch is strong enough, it can kill.

Bio capabilities dramatically changed. Two years ago it was dormant. Now, the frontier model is doing real biology and beating experts. It's speeding up research and the development of new medicines, it's the same skill that helps someone build a weapon. That weaponry is irreversible, hits everyone, and is pure nuke-class. The biology capabilities of these frontier models will likely end up constrained to the physical labs and unavailable outside of it, just like the most dangerous physical items.

Given how the last two years went, these future guesses for the state of capabilities two years out are probably conservative ones. Regarding cyber, the single thing today's model can't reliably do yet is beat a *well-defended* target with live defenders fighting back. Two more years of the current trend and that ceiling likely falls, which means the capability crosses the recoverability line and autonomous attacks on real infrastructure stop being a lab demo. Regarding bio, the model already handles the *information* half of the hard part. What still protects us is the *physical* half. That holds for now. It stops holding the moment these models get wired into automated labs, which some people are actively building.


## The Split

Cyber is recoverable and dual-use, and we have precedence on this. The 1990s encryption fight and the intrusion-software fight both showed that when defenders and attackers reach for the same tool, locking it down mostly handicaps the defenders, because the attackers were never going to follow the rules anyways. In that sense, the cyber-end leans toward spreading the capability, especially to the "good guys" (i.e. the defenders). That's roughly my own opinion on it, too. If the target is some open-source project, a patch ships fast and we recover. The scary version is critical infrastructure, particularly that which is run by governments.

Bio leans the other way. Spread it under close containment. You don't hand nukes around and hope the standoff holds. You lock it down. Which, again, is what's already happening.

Until next time, ✌️.
