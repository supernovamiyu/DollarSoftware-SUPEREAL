#!/bin/bash
# Instalar Ruby y Bundler si no están presentes
apt-get update && apt-get install -y ruby-full build-essential zlib1g-dev
gem install bundler jekyll
jekyll build
