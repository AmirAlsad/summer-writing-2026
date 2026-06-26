---
title: "Rifle vs. Nuke Pt.4"
description: "Who holds the off switch?"
date: 2026-06-25
pinned: false
image: ""
image_caption: ""
reading_time: ""
---

This is the last one. The whole series was a long way around to answer a single question: who should be holding the off switch on these models, and is anyone actually informed enough to be the one holding it?


## The Cyber Half

For the cyber side, the framework's answer is basically "don't build an off switch at all." It's dual-use and recoverable. Defenders and attackers reach for the exact same tool, and we've watched this twice already (the encryption fight and the intrusion-software fight). Lock the tool down and you mostly cripple the people following the rules, while the people who weren't ever going to follow them shrug and carry on. So you spread it, especially to the defenders.

This is exactly where the real-world case went wrong. When the government export-controlled Mythos and forced Anthropic to pull it, it didn't just take the model away from China (who, by everyone's estimate, are months behind at most and perfectly capable of building their own). It took it away from the defenders too. Dozens of the most respected people in security signed a letter begging the government to reverse it for that exact reason.

Way back in that earlier piece, I said something like "I trust Anthropic more than the government." In this specific case, I stand by it. Anthropic's controls on this model have been genuinely good, and the government's big intervention mostly just yanked a great defensive tool away from the "good guys." So, for the cyber half, my instinct holds.


## Open-Sourcing the Nuke

Bio is the nuke. The research tier is dual-use and great (it's how you get new medicine), but on top of it is the tier where the same skill helps someone build a weapon, and that tier is irreversible, hits everyone, and can hit pretty damn hard. The framework's answer for a nuke is to "lock it down." The question boils down to who does the locking.

Right now, the company does. Anthropic hardcodes the bioweapon stuff so it can't be unlocked regardless of who's asking. Good. But the fragility in this isn't something that can be taken lightly. It's one company *choosing* to. And not every company is going to choose to.

Let's talk about open-source models.

Go back to the 3D-printed gun example from the earlier pieces. The files were rifle-class, so the lock-down failed. It was fine. A printed plastic pistol isn't a national emergency. But now imagine the file wasn't for a pistol. Imagine it was for a machine gun, or something a lot more outrageous than that. Open-source models could end up being exactly that, just as the bio version. Nuke-class capability, no guardrails, sitting on a download page for anyone on Earth. We do not want that to happen.

"But banning it won't stop China." Correct — if "banning it" means a US rule that ends at the US border. That's the crypto-wars trap: software crosses borders that software doesn't recognize, and one defector hands it to everyone. But a frontier bio-capable model isn't PGP. PGP could be written by one guy in a bedroom; a model like this takes a handful of labs on Earth that can train it, which means the set of actors who'd have to agree is small enough to actually move. And here's the part that makes the agreement plausible: it's not in anyone's interest to have a downloadable bioweapon assistant loose inside their own borders. China restricts nuclear materials from its own public for the same reason the US does — not as a favor to us, but because a lone lunatic with a nuke is everyone's nightmare regardless of flag. So the move isn't "comply with American rules." It's the US drawing the nuke-class line first and getting the other capable states to extend a containment principle they already accept, to a new thing that earns it. Bioweapons are quietly becoming nuke-like; the response should be the one we already use on nukes. You're not trying to deny the capability to the handful of states who could build it anyway. You're trying to keep it from being handed to everyone — and that's a goal those states share.

"But banning it won't stop China." Correct. It won't. Bioweapons are quietly becoming nuke-like, and the capable states are going to get there regardless, because they can afford the expensive physical half. But that was never the goal. You're not trying to deny it to the handful of states who could build it anyway, as we see with the many (relatively) nations there are that weren't supposed to get nuclear capabilities but that still managed. You're trying to stop it from being handed to *everyone*, which is exactly what an open-weight release does. Some kid, some cult, some lone lunatic downloads the thing, fine-tunes the guardrails off in an afternoon, and now has a research-grade bioweapon assistant. The states aren't the problem (we couldn't do anything about it if we wanted to). Universal access is.

To be clear, it's not like the U.S. regulations are going to stop the Chinese (or any other capable nation) from open-sourcing their models, but it doesn't make sense for the Chinese to allow their own companies to put out bio-capable models. China restrics nuclear materials from its own public for the same reason the U.S. does. The main point is the U.S. drawing the nuke-class line first and getting the other capable states to extend a containment principle they've already accepted to a new thing.


## Friction Is the Feature

So, who keeps a nuke-class capability from being open-sourced? Not the companies. You can't leave it to them, because "the companies" includes whoever decides open weights are their whole business model, and a nuke-class danger can't rest on every single provider voluntarily choosing restraint. That's the spot where the government has to step in.

This is uncomfortable to write, particularly because I'm not a big fan of government involvement. I was once venting to a non-profit founder about how much bureaucracy clogs up the humanitarian world and government in general, and he said something that stuck with me. "Not every system is built for efficiency, and in some cases that's exactly how it should be." This is one of those cases where it's built for bureaucracy. For an off switch on a nuke, you do not want the efficient actor. The efficient actor is a company, and a company's entire reflex is to ship. You want the slow one. The one whose whole nature is to drag its feet, because here, dragging feet is the job. Friction is the feature, not the bug.

It's clear you're not allowed to open-source nuclear technology, and nobody calls that an outrage, because there's simply no good reason to. The same logic just has to extend. A government can require that open-weight providers ship models with the bio tier locked, and it probably has to go further than the models too, tightening the controls on the physical side, the materials and the synthesis, the way nuclear materials have always been controlled. The model is one half. The physical half is the other, and right now that physical half is the main thing saving us.


## So, Who Holds It?

For the rifle, I'm exactly where I started. Spread it, distrust the centralized hand, don't build an off switch.

For the nuke, it flips, and I don't think that's a contradiction so much as it is the boundary of the same idea. Open-sourcing a nuke-class model isn't decentralization being healthy. It's decentralization shoved one step past the point where it stops being safe. And there you do want a hand on the brake. Not because the government is smart, but because legitimacy and friction beat cleverness and speed when the downside is something you can't take back.

So "I trust Anthropic more than the government" was true in the narrow case and useless as a general rule. It works right up until the provider isn't Anthropic. And, annoying as the government's heavy-handedness was, it seems that it did send a signal to the field. I would venture to say the other big labs have gotten a bit slower with their newest models lately (we were expecting new models from Anthropic, OpenAI, and Google this week, but nothing came). I suspect the rising government attention is part of why. For the nuke tier, slower is not the worst outcome in the world.

All in all, that whole framework construction seems to have been less necessary than expected. It certainly overcomplicated things, but it allowed my thoughts to eventually converge towards this final output that I may not have arrived to otherwise. I'm thinking of these complex situations like a maze. You could construct some algorithm to get through the maze, but sometimes we focus too much on building the algorithm rather than just exploring the maze and seeing where we end up. At the end of the day, you'll make it to the exit (as long as you don't repeat the same paths).

Until next time, ✌️.
