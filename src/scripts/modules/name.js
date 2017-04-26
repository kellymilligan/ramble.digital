import { _, $, BaseObject } from '../common';

import * as matrixHelpers from '../utils/dom/matrix_helpers';
import applyCssTransform from '../utils/dom/apply_css_transform';
import degToRad from '../utils/math/deg_to_rad';

export default Object.assign( Object.create( BaseObject ), {


    text: null,

    skewCurrent: Math.PI,
    skewTarget: Math.PI,

    xCurrent: 0,
    xTarget: 0,
    yCurrent: 0,
    yTarget: 0,

    setup(options) {

        this.text = this.node.find( '.name__text' );

        _.defer( () => { this.text.removeClass( 'initially-hidden' ); });
    },

    onResize() {

    },

    onMouseMove() {

        this.skewTarget = Math.PI + Math.PI * 0.5 * this.mouseData.nY;
        this.xTarget = this.mouseData.nX * this.windowData.width * 0.007;
        this.yTarget = this.mouseData.nY * this.windowData.height * 0.01;
    },

    onAnimFrame() {

        this.xCurrent += ( this.xTarget - this.xCurrent ) * 0.03;
        this.yCurrent += ( this.yTarget - this.yCurrent ) * 0.03;

        this.skewCurrent += ( this.skewTarget - this.skewCurrent ) * 0.05;

        var translate = matrixHelpers.getTranslationMatrix( this.xCurrent, this.yCurrent, 0 );
        var skew = matrixHelpers.getSkewYMatrix( degToRad( this.skewCurrent ) );
        var matrix = matrixHelpers.getResultMatrix( [ translate, skew ] );

        var transformString = matrixHelpers.getTransformString( matrix );

        applyCssTransform( this.text, transformString );
    }

});