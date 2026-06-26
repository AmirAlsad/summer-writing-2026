---
title: "Rifle vs. Nuke"
description: "Building a framework for thinking about powerful technologies."
date: 2026-06-22
pinned: false
image: ""
image_caption: ""
reading_time: ""
---

It's been four days since I last updated the site. I've been writing, just not in complete pieces (poor decision, I know), and so today I'm releasing a couple of pieces to make up for what I've missed. At the end of the day, I'm not going to care too much about a small blip. It happens. Anyways, let's get into it.

A week and a bit ago I wrote a piece about [Anthropic and the government](/anthropic-and-the-government). I ended it on a question: who *should* be holding the off switch on these models, and is anyone actually informed enough to be the one holding it? I said I'd come back to it in a different piece. This is the start of that, because it's going to take a few pieces to get to an answer to that question (if at all).

Whenever I try to think about power (who should have it? who shouldn't? what happens when it spreads?), I end up reaching for weapons. A rifle. A nuke. There's something in that comparison that feels right, but it's fuzzy. So before I point any of this at AI, I want to build the comparison out properly: a way of looking at any powerful technology and saying which kind it is.

That's the project. This piece builds the framework. The next one will test it against history, and the last one turns it onto AI, the original inspiration for the idea.

To be clear, I'm not interested in handing down rules from on high and then bending the world to fit them. I want to go the other way. Modeling based on the real world. It's not necessarily against "first-principles thinking", but it definitely goes beyond it. The reasoning is that we already have strong intuitions about which technologies are fine to have everywhere and which ones terrify us. Well, not entirely, but we'll operate off the assumption that the current state of the world (excluding AI) is decently stable. Getting back to it, those intuitions are data that we'll "train" our model on. In other words, we'll take the world as an example and deduce the structure from the classifications that seem to have already been made. If the structure is real, it should fall out of the examples on its own (or maybe just a bit of shaking).

Let's start with the two weapons.


## Two weapons

If I own a rifle and my neighbor owns a rifle, I probably won't attack him. He can shoot back. We both know it, so we leave each other alone. If it ever did come to blows, the harm stays between the two of us. Nobody down the street gets hit.

Now give us both nukes instead.

It's not the same thing at all. If either one of us actually uses it, the whole neighborhood goes, not just the two of us in the fight. Same setup as before. Me, my neighbor, the same weapon in both our hands, and yet the logic that kept the rifles holstered doesn't carry over. Something about the scale changes the calculus entirely.

That's the puzzle I want to crack. The puzzle is: why does the same arrangement gives you a stable standoff in one case and a doomsday clock in the other?

The first thing that jumps to mind is the symmetry between the cases. We each have the thing. Me and my neighbor both have rifles; me and my neighbor both have nukes. If symmetry were what made things stable, the nuke case would be stable too, and it plainly isn't.

When we think of a rifle, we don't think of the end of the world. When we think of a nuke, we **DO** think the end of the world (at least I do). We ought to look at what happens the moment the weapon gets used.


## Recoverability

Picture the rifle fight playing out. It's bad. Maybe someone gets hurt. But the neighborhood is still there tomorrow. It absorbs the damage and moves on. Now, picture the nuke going off. There's no tomorrow to move on into. The thing you'd need in order to recover is the very thing that just got destroyed.

When the worst thing that can happen is survivable, handing the weapon to more people tends to *settle*. More rifles means more deterrence, the occasional bad day stays local, and the system keeps absorbing and recovering. But when the worst thing is *not* survivable, spreading it around never settles into anything. Every new person holding it is one more roll of the dice on an outcome you can't take back. Roll enough times, over enough years, and "probably never" turns into "eventually."

So putting the weapon in more hands has differing effects based on the input. It makes the rifle world *safer* (in theory) and the nuke world a ticking clock. Recoverability decides which one you're living in. It's worth saying the danger was never just about how bad a single use is. A doomsday device locked in one vault is nearly harmless; so is something everyone owns that can't really hurt anyone. You need both, the power *and* the spread, for there to be a problem at all.


## Beyond the Rifle or Nuke

That gives us two clean buckets.

A **rifle** is recoverable, and on top of that you can deter people from misusing it. There's a tomorrow to threaten, and if someone does shoot at you, you know who it was and can answer. Spread it around and it stabilizes. Distribute.

A **nuke** is not recoverable. There's no version of "let it spread and trust the standoff" that ends well. Lock it down.

But there's a third bucket. What about something that *is* recoverable, but where you can't deter the misuse, because you can't tell who did it? Deterrence needs a target. The law doesn't apply if you don't get caught. Take that away and the whole "don't attack me, I'll attack back" logic falls apart, even though the harm itself is survivable.

In that case neither rule applies. You can't lock it down like a nuke, but you can't lean on a standoff either, because the standoff needs an enemy you can point at. The only thing that keeps it stable is whether spreading it around arms the *defensive majority* faster than it arms the *offensive minority*. I'll leave it there for now...


## How Many Hands

The danger can depend on how many hands hold the thing. But that alone decided by other things. How easy it is to produce, and who it's designed to be wielded by. A rifle is built to be used by basically anyone who can hold it, so it's simple. It gets mass-produced and there are tons of them around. Step up to a machine gun and it's not meant for every random person, so it doesn't spread out the same way.

A nuke is meant for a handful of states, and it's not that easy to make. You need things you can't just manufacture your way around. Each of those is a kind of gate, and the narrower gate is the one that decides how far the thing actually spreads.

How *good* can a rifle get and still count as a rifle? A machine gun is more powerful than a rifle (in theory). So is a tank. But, they're all still rifles (in an abstract sense that may not get across properly). The harm stays pointed at a target and the fight stays survivable. The point is you can climb a long way up the power ladder and never leave the bucket. A tank is just a magnificent rifle. What kicks you into the nuke bucket isn't raw power at all; it's crossing the one line where you can't recover. Power moves you *up*. Only recoverability moves you *across*.

Keep in mind all of this only works for technologies you can actually point at someone on purpose. Things like encryption can't be pointed at anyone. It's a defensive mechanism. A nuclear power plant can't either. Sure, it could blow up by accident and hurt a lot of people, but you don't *aim* a power plant at your enemy. It's a simple point for the purposes of a reasonable discussion: assume every use of the thing is deliberate, and only bother with technologies that allow for a deliberate harmful use in the first place. I also judge these things at their worst. Anything that can be turned into an effective weapon eventually will be. Either someone builds it for that on purpose, or someone repurposes whatever's already lying around.


## What's Next

There's the frame. I built this to eventually aim it at AI. But one must not trust a framework that's only ever been tested against the examples it was "trained" on. That's overfitting. So before applying it to AI, I want to run it against history.

By the way, to be clear, I understand that a matter as complex as this can't merely be modeled as simply as I portrayed it. Despite that, I think there's much to gain from such thought experiments.

Until next time, ✌️.
