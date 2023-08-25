FROM node:18-slim

# pubsub need ps to SIGKILL
RUN apt-get update && apt install -fy procps \
    git \
    sudo \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# add sudo for node
RUN echo "node ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

USER node
