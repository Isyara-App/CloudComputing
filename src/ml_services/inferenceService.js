const tf = require('@tensorflow/tfjs-node');
const InputError = require('../execptions/InputError');

async function predictClassification(model, image) {
    try {
        let tensor = tf.node
            .decodePng(image, 3) // 3 means RGB (ignoring the alpha channel)
            .resizeNearestNeighbor([224, 224])
            .expandDims() // Add batch dimension [1, 224, 224, 3]
            .toFloat();

        // Check if the image has 4 channels (RGBA), and remove the alpha channel if present
        if (tensor.shape[2] === 4) {
            tensor = tensor.slice([0, 0, 0], [-1, -1, 3]); // Remove alpha channel if needed
        }

        const prediction = model.predict(tensor);
        const score = await prediction.data();
        const confidenceScore = Math.max(...score) * 100;

        const classess = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
            'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

        const classResult = tf.argMax(prediction, 1).dataSync()[0];

        const label = classess[classResult];

        return { confidenceScore, label };
    } catch (error) {
        throw new InputError(`Model doesn't predict successfully: ${error.message}`);
    }
}

module.exports = predictClassification;