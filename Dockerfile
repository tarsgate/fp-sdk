FROM ubuntu:24.04

RUN apt update && \
    apt install --yes --no-install-recommends npm

# Clean up apt cache to reduce image size and avoid unnecessary files in the final layer
RUN rm -rf /var/lib/apt/lists/*

CMD ["bash"]
