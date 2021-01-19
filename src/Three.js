import React, { Component } from "react";
import * as THREE from "three";

const style = {
    height: 100 + "vh", 
    width: 100 + "vw",
    position: "fixed"
};

class Three extends Component {
    
    
    componentDidMount() {
        this.sceneSetup();
        this.addCustomSceneObjects();
        this.startAnimationLoop();
        window.addEventListener('resize', this.handleWindowResize);
    }

    sceneSetup = () => {
       
        const width = this.mount.clientWidth;
        const height = this.mount.clientHeight;

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            75, 
            width / height, 
            0.1, 
            1000 
        );
        this.camera.position.z = 9; 
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( width, height );
        this.mount.appendChild( this.renderer.domElement );
    };

    addCustomSceneObjects = () => {
        const geometry = new THREE.BoxGeometry(3, 3, 3);
        const material = new THREE.MeshPhongMaterial( {
            color: 0x156289,
            emissive: 0x072534,
            side: THREE.DoubleSide,
            flatShading: true
        } );
        this.cube = new THREE.Mesh( geometry, material );
        this.scene.add( this.cube );

        const lights = [];
        lights[ 0 ] = new THREE.PointLight( 0xffffff, 1, 0 );
        lights[ 1 ] = new THREE.PointLight( 0xffffff, 1, 0 );
        lights[ 2 ] = new THREE.PointLight( 0xffffff, 1, 0 );

        lights[ 0 ].position.set( 0, 200, 0 );
        lights[ 1 ].position.set( 100, 200, 100 );
        lights[ 2 ].position.set( - 100, - 200, - 100 );

        this.scene.add( lights[ 0 ] );
        this.scene.add( lights[ 1 ] );
        this.scene.add( lights[ 2 ] );
    };

    startAnimationLoop = () => {
        this.cube.rotation.x += 0.01;
        this.cube.rotation.y += 0.01;
        this.renderer.render( this.scene, this.camera );
        this.requestID = window.requestAnimationFrame(this.startAnimationLoop);
    };

    handleWindowResize = () => {
        const width = this.mount.clientWidth;
        const height = this.mount.clientHeight;

        this.renderer.setSize( width, height );
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
    };


    render() {
      return (
        <div>
            <div className="Title">SKOROBOHATOV SVIATOSLAV</div>
            <div className="Links">
                <a className="Links_a" href="https://www.instagram.com/sc.svv">Instagram</a>
                <br/>
                <a className="Links_a" href="https://www.tiktok.com/@skorobohatov?">Tik - Tok</a>
                <br/>
                <a className="Links_a" href="https://t.me/skorobohatov">Telegram</a>
            </div>
            <div style={style} ref={ref => (this.mount = ref)}></div>
        </div>
      )
    }
  }

  export default Three