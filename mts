#!/bin/sh
dir=2021/$1
mkdir -p "$dir"
cp solution.ts "$dir"
touch "$dir"/input.txt
code "$dir"/solution.ts "$dir"/input.txt
