---
title: "Who's asking the questions?"
description: "Figuring out what AI effectively does in the thinking landscape."
date: 2026-07-12
pinned: false
image: ""
image_caption: ""
reading_time: ""
---

## The Question Game

There's a Finnish logician named Jaakko Hintikka who built something called the "interrogative model of inquiry." I haven't read his actual work yet (he's on the reading list, right next to Dewey from last piece), but I'll talk about his work from the other sources that I've looked at.

Inquiry is a game with exactly two kinds of moves. The first is the deductive move, where you derive consequences from what you already have. The second is the interrogative move, where you put a question to some "oracle." An oracle is anything that can answer: nature (through an experiment), a database, a witness, your own memory, your own eyes.

His most common example was Sherlock Holmes. The famous "deductions" mostly aren't deductions at all. They're questions put to the crime scene, and the observations are the oracle's answers. The logic in between is nearly trivial. What makes Holmes "Holmes" is **knowing what to ask the room.**

Two more parts of the model matter for where I'm going. The first is the presupposition. In Hintikka's game, you can't ask a question until its presupposition has been established. You can't ask "which route did the thief take?" until "a thief took some route" is on the table. Every question opens up a space, and the questions available inside that space are constrained by it.

The second is a distinction between definitory rules and strategic rules. Definitory rules tell you which moves are legal. Strategic rules tell you which moves are good. Hintikka's complaint (again, from what I've gathered) was that logic education obsesses over the definitory level while all the actual skill of thinking lives at the strategic level. Anyone can run valid deductions. Knowing which question to ask next is the whole game.


## AI in the Inquirer's Seat

Now, if I had to think about what AI effectively does in this thinking landscape, it can obviously do the deductive stuff quite well. That's more a function of effort and raw knowledge than anything else, and as a machine, it can work endlessly with all the knowledge in the world. The definitory side of the game has gotten cheap.

The interrogative moves are where it gets interesting. No doubt AI can make interrogative moves. Watch a coding agent work and you'll see it probing: reading files, running tests, checking outputs. Those are questions put to the codebase, which is the oracle in this particular game. But, and this is the crucial part, the AI can only ever make those moves as a subset of what the person prompting it frames. You start off with some general space, and as you make interrogative moves, you go deeper and deeper, and the space gets more and more narrow. The prompt is what establishes the presuppositions, and every question the AI asks afterward lives inside them. Because these systems have to be prompted before thinking, they always operate within a smaller scope of interrogative thinking.

Let's go through an example. Say I'm an indie developer working on my app and I'm optimizing some algorithm. Along the way, I can take notice of some poorly designed code in some unrelated functionality (say, some UI code) and decide that I'm going to address that as well as a part of the days' work. If I had delegated that same algorithm optimization to an AI agent, it likely would not have taken heed of the poorly designed UI code, assuming it wasn't in the same file and all. As long as the scopes were different, the AI would just focus on the algorithm optimization it was prompted to do. In Hintikka's terms, the ugly UI code is an answer to a question whose presupposition ("something outside this task might need attention") was never established in the game the AI is playing. The developer walking through the codebase is playing a different game, with a much wider base: developing the whole app.


## No Stake in the Matter

To be clear, these models do sometimes flag things outside the task ("by the way, this function over here looks broken"). But as part of the previous example, I assumed that the thing to be flagged lived in a separate area beyond the original task, requiring another line of interrogation ("let's check the UI code"). I don't think this sort of behavior is completely foolproof though. Give a model an "agentic loop" to prompt itself for developments, and we start to get into some funny territory.

Consider the reality of these models. They're designed to be manipulated and taken advantage of by humans. Say I'm working on some B2C product, and I tell the model to wipe out the main feature, the one that most of the people who use the product love. It'll comply. Sure, at most it'll give some resistance, question whether that's the wisest move. But at the end of the day, it's going to comply. This isn't just a case of the model failing to notice a problem. It's the case where the model plausibly does see the problem, may even say something about it, and then yields to the line of interrogation being imposed on it.

I don't think that's a capability gap that better models will close. It's the product working as designed. Imagine a model that fought you for the feature ("no, I've watched the usage data, I'm not removing it"). It seems kinda funny to even imagine a model refusing ("i'm tired boss"), but in reality it would be a bad product. This gap does get addressed with agentic loops, but again, there's some funny business there that I don't want to get into now.

I think it all goes back to the model not having a stake in the matter. The developer notices the UI code because it bothers them. It's their app, their name on it, their future self maintaining it, so a defect anywhere in it registers as friction. Nothing is at stake for the model, so nothing itches. This is the felt disturbance idea that we discovered in the last piece. The model inquires inside someone else's itch. Interrogation narrows within a scope. Disturbance is what widens it. And only the narrowing can be delegated.

To be fair, the model isn't stakeless in general. Ask it to help build malware and it'll refuse no matter how you dress up the request. Those non-negotiables are installed upstream by the lab, and they sometimes don't work. The model has stakes in ethical behavior (so the lab that made it doesn't get sued), but it doesn't have a stake in your app, your users, or your beloved feature.

Within that scope of interrogative thinking, there must be some sense of ownership, because the app is still the indie developer's app, not the AI's, even though the AI helped immensely with constructing it. This goes broader into human delegation, how it works, and who's truly responsible for what comes out of it. That's a piece for another day.


## AI in the Oracle's Seat

Let's now look at AI as the "Oracle".

Last piece ended with the swallowed questions. The question that still forms in the child's head but gets swallowed before it reaches the air, because of what the peers might think. I think a lot of those questions are now going somewhere new.

Every private oracle before this one had a catch. Books don't answer your question. They answer the question the author guessed you'd have. Search answers the common version of your question. But now there's an oracle with the responsiveness of a person, minus the status cost of asking a person. You can interrogate it at 2 AM about the stupidest gap you have, and nobody witnesses the admission. I've written before about turning to AI as a thinking partner (in ["I've got a problem."](/ive-got-a-problem)), and the benefits and dangers I listed there still stand. An entity with context about you that knows more than any human on Earth. An entity that might end up doing all the thinking for you. An entity that gets treated as if it has no bias, when it will inevitably have some.

So, the swallowed questions might be resurfacing, just in private. If that's true, the questioning didn't die. It migrated. I'm not going to declare this migration good or bad. But the possible consequences are worth taking note of. The public question had spillover. The kid who asks in class closes thirty gaps, not just their own. A witnessed answer can be challenged by anyone in the room. So, you can construct a world where the migration is individually rational and collectively impoverishing. Each person better off asking in private, and the room worse off for it. You can also construct the other world, where questions that would have died in the throat now at least get asked somewhere. Both constructions seem plausible to me, and it's not impossible for both realities to exist simultaneously.

There's a cute little dystopian reality where no one asks questions anymore and we all just inquire our personal, friction-less "oracles". "Oracles" that tell us to be good citizens and to never break the rules. May Allah (SWT) protect us from such a future.

Until next time, ✌️.
