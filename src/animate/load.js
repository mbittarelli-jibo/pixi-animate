/**
 * @module PixiAnimate
 * @namespace PIXI.animate
 */
(function(PIXI, undefined)
{
    /**
     * @class load
     * @description Entry point for loading Adobe Animate exports:
     * 
     * **Load and auto-add to parent**
     * ```
     * var renderer = new PIXI.autoDetectRenderer(1280, 720);
     * var stage = new PIXI.Container();
     * PIXI.animate.load(lib.MyStage, stage);
     * function update() {
     *      renderer.render(stage);
     *      update();
     * }
     * update();
     * ```
     * **Load and handle with callback**
     * ```
     * var renderer = new PIXI.autoDetectRenderer(1280, 720);
     * var stage = new PIXI.Container();
     * PIXI.animate.load(lib.MyStage, function(instance){
     *     stage.addChild(instance);
     * });
     * function update() {
     *      renderer.render(stage);
     *      update();
     * }
     * update();
     * ```
     */
	/**
	 * Load the stage class and preload any assets
	 * @function load
	 * @param {Function} StageRef Reference to the stage class
	 * @param {Array} [StageRef.assets] Assets used to preload
	 * @param {PIXI.Container} parent The Container to auto-add the stage to.
	 * @param {Function} [complete] Function to call when complete
	 * @param {String} [assetBaseDir] Base root directory
	 */
	/**
	 * Load the stage class and preload any assets
	 * @function load
	 * @param {Function} StageRef Reference to the stage class
	 * @param {Array} [StageRef.assets] Assets used to preload
	 * @param {PIXI.Container} parent The Container to auto-add the stage to.
	 * @param {String} [assetBaseDir] Base root directory
	 */
	/**
	 * Load the stage class and preload any assets
	 * @function load
	 * @param {Function} StageRef Reference to the stage class
	 * @param {Array} [StageRef.assets] Assets used to preload
	 * @param {Function} complete The callback function when complete.
	 * @param {String} [assetBaseDir] Base root directory
	 */
	var load = function(StageRef, parent, complete, assetBaseDir)
	{
		// Support arguments (ref, complete, assetBaseDir)
		if (typeof parent == "function")
		{
			assetBaseDir = complete;
			complete = parent;
			parent = null;
		}
		else
		{
			if (typeof complete == "string")
			{
				assetBaseDir = complete;
				complete = null;
			}
		}

		// Root load directory
		assetBaseDir = assetBaseDir || "";

		var assets = StageRef.assets || [];
		var loader = new PIXI.loaders.Loader();

		function done()
		{
			var stage = new StageRef();
			if (parent)
			{
				parent.addChild(stage);
			}
			if (complete)
			{
				complete(stage);
			}
		}

		// Check for assets to preload
		if (assets && assets.length)
		{
			// assetBaseDir can accept either with trailing slash or not
			if (assetBaseDir) assetBaseDir += "/";

			for (var asset, i = 0; i < assets.length; i++)
			{
				asset = assets[i];
				if (Array.isArray(asset))
				{
					loader.add(asset[0], assetBaseDir + asset[1]);
				}
				else
				{
					loader.add(assetBaseDir + asset);
				}
			}
			loader.once('complete', done)
				.load();
		}
		else
		{
			// tiny case where there's only text and no shapes/animations
			done();
		}
	};

	// Assign to namespace
	PIXI.animate.load = load;

}(PIXI));