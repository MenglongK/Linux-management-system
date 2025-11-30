#!/bin/bash
git add .
read -p "Enter commit message: " msg;
git commit -m "$msg";
read -p "Enter branch: " branch;
git push -u origin $branch;
