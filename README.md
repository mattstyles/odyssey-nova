
# odyssey-nova

> Odyssey Nova Web-only Client

Standalone front-end version of Odyssey:Nova

## Getting Started

Version 0.1.0 will mark the start of hosting the game somewhere, and that milestone will be dictated mostly by some form of decent interactive layer being implemented. That means that entities and panels need to be implemented, at least to the extent that a player has the chance to interact with the game world, even if fairly sparsely. Until then, if you want to see whats going on you’ll have to build from source, thankfully, for the web—only version, it’s a fairly trivial affair to get going.

You’ll just need [node](https://nodejs.org/) and [npm](https://www.npmjs.com/) to get going, both can be downloaded from the [node foundation](https://nodejs.org/). Current builds are running against version 4, but it’ll probably build just fine with just about any fairly recent version.

```sh
git clone git@github.com:mattstyles/odyssey-nova.git
npm install
npm run make
npm run serve
```

The `serve` script should start a server listening on port 3000 but serving all the stuff you need will be in `dist` once built if you prefer to serve it a different way.

## Contributing

At this stage all the code is open (and will probably remain so) but I’m not currently accepting pull requests. Bug reports, feature requests or any other feedback are encouraged so please feel free to open an issue.

## License

MIT
