FROM ubuntu:24.04

RUN apt update && \
    apt install --yes --no-install-recommends npm

# cleanup apt cache to reduce img size & avoid unneeded files in the final layer
RUN rm -rf /var/lib/apt/lists/*

CMD ["bash"]
