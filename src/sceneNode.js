/**
 * @class SceneNode
 * @desc A SceneNode is a node in the scene graph.
 * @property {MeshDrawer} meshDrawer - The MeshDrawer object to draw
 * @property {TRS} trs - The TRS object to transform the MeshDrawer
 * @property {SceneNode} parent - The parent node
 * @property {Array} children - The children nodes
 */

class SceneNode {
    constructor(meshDrawer, trs, parent = null) {
        this.meshDrawer = meshDrawer;
        this.trs = trs;
        this.parent = parent;
        this.children = [];

        if (parent) {
            this.parent.__addChild(this);
        }
    }

    __addChild(node) {
        this.children.push(node);
    }

    draw(mvp, modelView, normalMatrix, modelMatrix) {
        /**
         * @Task1 : Implement the draw function for the SceneNode class.
         */
        

        if (this.parent) {
            var parentTransform = this.parent.trs.getTransformationMatrix();
            mvp = matrixMultiply(mvp, parentTransform);
            modelView = matrixMultiply(modelView, parentTransform);
            normalMatrix = matrixMultiply(normalMatrix, parentTransform);
            modelMatrix = matrixMultiply(modelMatrix, parentTransform);
            console.log("okeyy");
        }
        
        var nodeTransform = this.trs.getTransformationMatrix();
        // Use nodeTransform for all transformations
        var transformedMvp = matrixMultiply(mvp, nodeTransform);
        var transformedModelView = matrixMultiply(modelView, nodeTransform);
        var transformedNormals = matrixMultiply(normalMatrix, nodeTransform);
        var transformedModel = matrixMultiply(modelMatrix, nodeTransform);
        

        // Draw the MeshDrawer
        if (this.meshDrawer) {
            this.meshDrawer.draw(transformedMvp, transformedModelView, transformedNormals, transformedModel);
        }
        for (const child of this.children) {
            child.draw(transformedMvp, transformedModelView, transformedNormals, transformedModel);
        }
    }

    

}

function matrixMultiply(matrixA, matrixB) {
    var C = [];
    for (var i = 0; i < 4; ++i) {
        for (var j = 0; j < 4; ++j) {
            var v = 0;
            for (var k = 0; k < 4; ++k) {
                v += matrixA[j + 4 * k] * matrixB[k + 4 * i];
            }
            C.push(v);
        }
    }
    return C;
}
