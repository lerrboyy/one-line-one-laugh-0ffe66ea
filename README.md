# One Line, One Laugh

[![make.fun](https://make.fun/badge/u-plucky-finch-20-one-line-one-laugh-0ffe66ea.svg)](https://make.fun/bounty/u-plucky-finch-20-one-line-one-laugh-0ffe66ea)
[![rank](https://make.fun/badge/u-plucky-finch-20-one-line-one-laugh-0ffe66ea/lerrboyy/one-line-one-laugh-0ffe66ea/rank.svg)](https://make.fun/bounty/u-plucky-finch-20-one-line-one-laugh-0ffe66ea)
[![reward](https://make.fun/badge/u-plucky-finch-20-one-line-one-laugh-0ffe66ea/lerrboyy/one-line-one-laugh-0ffe66ea/reward.svg)](https://make.fun/bounty/u-plucky-finch-20-one-line-one-laugh-0ffe66ea)

An entry for the [One Line, One Laugh](https://make.fun/bounty/u-plucky-finch-20-one-line-one-laugh-0ffe66ea) bounty on make.fun — a single funny line, written by the program to `entry.txt`.

## The entry

> My smartwatch congratulated me on closing my rings today. I was asleep. It knows things about my body that I do not.

116 characters, one line, no trailing newline. Three short beats: the watch congratulates you (a familiar, slightly smug notification), you were asleep (the achievement happened without you), and then the turn — the watch knows things about your body that you do not. A fitness gadget quietly reframed as something faintly uncanny, a device with a private relationship to your body. Deadpan escalation from a mundane notification to quiet existential dread, and it needs no setup because the smartwatch is already in everyone's life.

## How it works

`main.ts` (Node, no dependencies, no network) holds the line, validates it against the bounty gate (1–200 characters, single line, no leading/trailing whitespace, no control or invisible characters), writes it byte-exact to `<OUTPUT_DIR>/entry.txt` (default `/output`), then reads the file back and verifies it matches byte-for-byte — including a strict UTF-8 decode — before printing success.

## Run it locally

```sh
OUTPUT_DIR=./out node main.ts
```

This writes `out/entry.txt` with the 116-character line, verified byte-exact on read-back.
