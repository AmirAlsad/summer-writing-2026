---
title: "The demand just isn't there."
description: "So more supply isn't going to help..."
date: 2026-06-17
pinned: false
image: ""
image_caption: ""
reading_time: ""
---

The other day I made a couple of unsupported claims. The first was that people don't actually want what SpaceX is selling. The second was that it's ridiculous how much we've decided to balance on one man. I said I'd save the full explanation for another piece, so here it is.


## The Test for Demand

I like to think in analogies. One "analogized thought" that came to my mind when thinking about all this was "nobody asked for the iPhone." It was a counter to my original thought, and counters like these are critical to developing solid arguments. When someone can bring up another example, dismantling why that example doesn't apply is sure to strengthen the original argument.

The idea that no one was "in need" of the iPhone's innovation is a fair one. But, I think if you look at what Apple did, you can see why that idea doesn't quite hold up. People didn't want "a smartphone" as some abstract object. They did, though, already want the things a smartphone does. They wanted to talk to each other. They wanted to play. They wanted to find their way around. Those wants were already there, sitting in everyone, fully formed. What Apple noticed was that the technology of the time sat awkwardly in between you and the thing you already wanted. The little plastic keyboard, the stylus, the menus buried six clicks deep. Apple's whole move was to get rid of that awkwardness. It wasn't inventing a desire. It was removing the friction between a person and a desire they already had.

From that counter, we can abstract to a more fundamental question: does the thing connect to a want that already exists, with the friction stripped away? If it does, there's something huge there, because the demand was always there and you just unlocked it. A sort of realized potential. The iPhone clearly passes that test. So does almost every innovation I can think of that actually changed how people live.

Now, consider the idea of getting to Mars. Where's the pre-existing want? Beyond the desire to explore, which is something a minute amount of people hold, I can't figure it out. It's a cool idea. I'll give it that much. But "cool idea" is not the same thing as a want. Nobody is lying awake, wishing they could go to Mars. Not in the way people genuinely ached to talk to someone far away. The strongest version of the want that can be constructed is a conditional one. Something along the lines of "sure, if it somehow makes life on Earth better or more convenient, go for it." But that goes back to the core idea of fulfilling an existing want (living an easier life). The aspiration of going to Mars is asking people to want something new, and how terrible are people at that...


## Benefits of the Space Program

Here's another counter: nobody "wanted" the space program either, and look what it gave us. GPS. Weather satellites. A pile of technologies nobody could have requested in advance because nobody knew they were possible. So, maybe SpaceX is the same kind of bet. Maybe the wants show up after the capability does, and judging it by today's demand is exactly the mistake people made about every frontier technology. Let's get into why this sort of argument doesn't hold.

Start with the byproducts themselves. GPS and weather satellites get held up as things nobody asked for, but that's not quite right. People desperately wanted to know if it was going to rain tomorrow, because they wanted to plan their outdoor events and lives around the weather. People wanted to know how to get where they were going. We can prove the demand for directions was there long before GPS, because people were buying and folding and cursing at paper maps for generations. The satellites didn't create those wants. They served wants that were already screaming, just better than anything before them. They were latent demand, finally unlocked by new technology. Technology makes things easier, and new technology just does that in a new way. That new way has to either be easier to execute on OR better at executing (eventually somewhere down the line). Since that was pretty vague, here it is in other words: that new way has to either make it easier to make our lives easier OR make our lives even easier. That also seems a bit confusing, but that's the best I'll do for now.

Now, I'll grant that some capabilities genuinely do crack open new fields just by getting cheap or good enough, with the uses showing up afterward. Cheap computing is the obvious one. Nobody was asking for half the things computers ended up doing. But even there the test doesn't really break, because there was an enormous amount of real, latent activity bottled up behind the cost of computation, waiting for the price to fall. The question, again, is whether something real is sitting behind the price.

The space program was a completely new field. We had never done it. When you push into genuinely new territory, you discover uses you couldn't have predicted, because the whole space thing is unexplored. SpaceX is not that. Spaceflight is not a new field anymore. What SpaceX has is an enhanced capability within an existing field. They made getting to orbit dramatically cheaper, which is real and impressive, but it's an improvement on something we already do, not the opening of somewhere we've never been. And an enhanced capability inside an existing field only becomes valuable when demand for that field grows. Cheaper launch is worth an enormous amount if and only if a lot more people suddenly need to put a lot more stuff into space. Without that growth in the underlying demand, you've just made an existing, modestly sized activity cheaper. Useful, but not two-and-a-half-trillion-dollars useful.

So, let's ask the question. Is there some field, some real and growing demand, that cheaper access to space would unlock?


## The One Real Want: Compute

Unlike Mars, compute connects to a want that very much exists. People don't care about compute itself, of course. Nobody wants a rack of chips the way they wanted to call their kid. But people care intensely about what compute gives them, which right now means artificial intelligence. The thing that helps us think, helps us work, helps us build. That demand is real, it's demonstrated, and it's growing fast.

And so, if the world's appetite for AI keeps growing, the world's appetite for compute grows with it. And if we need ever more compute, eventually we run out of room and power down here, and the next place to put it is up there. Solar power with no night, no neighbors to complain, no land to buy. Suddenly cheap launch isn't serving the modest old satellite business. It's serving the single most demanded technology of the era.

I don't think it'll work out that way though, but to explain why, I have to talk about where I think AI is headed... I know I'm making a fatal blunder by trying to predict the tech space, but I'll do it anyways for the love of the game.


## Scaling Era, Not Optimization Era

Here's the core assumption behind the orbital compute story: that we are going to need more and more and more compute, forever, with no end in sight. The assumption alone isn't entirely crazy. It's been true for the past few years. But "true for the past few years" doesn't equate to permanence.

The thing to understand is that the AI race, as it's run today, is a scaling race, not an optimization race. The labs are pouring everything into building the biggest and best models they can. They are not, for the most part (as far as I'm aware), obsessing over efficiency. And this isn't because they're dumb. It's simply because now's the time to perform, not to be efficient.

It's a winner-take-most fight, so being the best model in the world is a matter of survival. Being the most cost-efficient model in the world, on the other hand, is a margins question. And you do not sit around optimizing your margins while you're still fighting to not die. As a result, every spare unit of compute goes toward capability, toward the frontier, toward winning the here and now. Optimization gets deferred. Not abandoned, but simply deferred.

You can already see the optimization era peeking through though, particularly by focusing on the open models. Just days ago, an open-weight model called GLM-5.2 came out, and it lands close to the frontier (with the benchmarks taken at face-value) at roughly a fraction of the cost. And it gets there partly through clever architectural tricks that cut the compute needed per token rather than just throwing more hardware at the problem. That's a sign of the optimization era. The performance gap is collapsing while the cost gap stays wide open, which tells you there's an enormous amount of efficiency still lying on the table, waiting to be picked up the moment anyone's incentive shifts from "win" to "win cheaply."

You see, software optimizations iterate very quickly. All it takes is a good idea and some changes to the code. Hardware, on the other hand, iterates at the speed of months/years (whether it's building a data center on Earth or launching one into space). Hardware holds the power in that it bottlenecks what the software can achieve, but as long as there's room for the software to be optimized, then pushing on that front is a whole lot easier. And I think this AI business has a whole lot of room for optimization that hasn't been acted on.

Look at the core architecture under all these models, the transformer. It's not an optimal structure. From my knowledge, which isn't that of an expert AI researcher, there's a decent body of research showing alternative architectures can match or beat the transformer at smaller scales while burning far less compute. The catch is that nobody wants to spend their precious compute on an unproven design, so the frontier keeps riding the transformer because it's the bet that people know how to place. The alternatives never get their shot at the scale where we'd actually find out if they're better because the big dogs are trying to edge each other out of the race while the small dogs just try to copy what the big ones are doing... There's been a sort of "canonization" with the transformer when it's really just the way that got there first and got locked in. The point is that there's lots of slack and we haven't even begun tugging at the rope.

In short, we're not in the optimization era yet, but we're walking straight into it. The picture where we have to keep multiplying physical machines forever and eventually start launching them into orbit, assumes the demand for compute will grow beyond what the Earth can provide. I don't think it's going to.


## Who is this "Jevons" guy?

It's the idea that the availability of something increases the demand for it such that it being cheaper doesn't actually reduce the amount of the thing in use.

Jevons paradox goes back to the 1860s. A man named William Stanley Jevons was looking at coal, and he noticed something that didn't sit right. Steam engines were getting dramatically more efficient, doing the same work on less coal, so the natural expectation was that Britain would burn through less of the stuff. The opposite happened. Coal consumption climbed. Because once steam power got cheap and efficient enough, it suddenly made sense to use it for a thousand things it was never worth using for before. The efficiency didn't save the coal. It made steam worth reaching for everywhere, and all that new use surpassed the savings many times over.

Make AI cheap enough to run and you don't pocket the savings. You put an agent on every task, running day and night, stitched into every app and device and corner of the digital world. The cheaper it gets, the more places it makes sense to use, and the total appetite for compute doesn't shrink. It explodes. This may be the case, and only time will tell.

Even if you were to assume this to be the case, it doesn't justify orbital compute (the whole point of me even including this section is because someone was sure to have thought about it). There's a jump from "we'll need way more compute," which is hypothetically true if we took Jevons paradox to be true, and "so we'll need to put compute in space." There's a conflation between getting more compute and putting compute in space.

More demand only sends you to space if you've run out of room on the ground. And space is the last place on the list. It is the slowest, most expensive, most punishing place to put a machine that exists. You don't end up there because demand grew. You end up there because every cheaper option underneath it has been used up AND will continue to be used up for the years it'll take to get functional data centers in space.

On the note of actually getting these space data centers to work, as a little side tangent, I don't think "it's technically hard" is a good reason to bet against anything. Throw enough engineering talent and enough money at a hard problem for long enough and it tends to fall, and as the underlying tech keeps improving, the whole thing only gets more plausible over time. The thing that sinks the orbital data center, in my eyes, isn't that it's hard to build. It's that the reason to build it isn't there.

One more side tangent, so I'm not seen as naive, at least not in this regard. Even if every last bit of the demand I've been doubting did show up, there's no guarantee SpaceX is the one that captures it. The space industry is developing and plenty of other players are coming up. A head start has never been a promise of staying out front. That said, I'm not going to lean on this point too heavily. SpaceX probably will hold its lead for a good while, the same way Tesla did.


## Stories are Powerful, and so are Systems

So if the demand isn't there, and the profits sure aren't there, why is the company valued so highly? Last time I said it was pure narrative gravity, and I'll stand by that. A good enough story pulls everything toward it. But there's more to the story (literally). It's that the way this whole thing was set up makes it remarkably hard for anyone to bet against it.

First, barely any of the shares are actually out there to be traded. Most are locked up, meaning the insiders holding them can't sell for months. So the supply floating around is tiny. Second, the company got ushered into the big market indexes, the ones that index funds track, forcing the funds to buy the companys stock.

Tiny supply meets forced buying, and the price gets shoved up. A higher price means a bigger slice of the index, which means even more forced buying. The story sets the price, and the plumbing locks it in while cranking it higher.

That's part of what actually pisses me off. Ordinary belief, you can argue with. If enough people think a thing is overpriced, they can sell, they can bet against it, they can pull the other way, and the price has to answer to that tug-of-war. But forced, mechanical buying doesn't answer to anybody. The narrative doesn't even have to keep winning people over. The machine keeps buying either way. At least that's how I interpreted the reality of the rules to be. I hope I'm wrong.


## It Still Rests on One Man

Elon has done remarkable things. But somewhere along the way people started holding him above human comparison. In all reality, he's just another human. He eats. He sleeps. He gets older. He has relationships, and memories, and a body that will do exactly what every body eventually does.

There's no backup. No redundancy. If he gets sick, if he burns out, if he changes his mind, if one day he's simply gone, what exactly becomes of the small economy we've stacked on top of him?

We've (or rather, the markets have) decided one man is worth more than almost any company on Earth, and we've decided not to think too hard about the fact that he's a man. Kinda crazy.

Until next time, ✌️.
