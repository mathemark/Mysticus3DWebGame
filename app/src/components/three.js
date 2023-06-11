import React, { Component } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { saveLevel, sleep} from './utils.js';
import { secondSecret, secondSecretv2 } from './secrets.js';


export default class secondlevel extends Component {

    componentDidMount() {

        saveLevel('2level')
        const fontLoader = new THREE.FontLoader();
        const fadeInElement = document.querySelector('.fade-in-from-black');

        window.addEventListener('load', () => {
            fadeInElement.classList.add('fade-in');
        });

        fontLoader.load('https://threejs.org/examples/fonts/optimer_regular.typeface.json', (font) => {

            var scene = new THREE.Scene();
            var camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);
            var renderer = new THREE.WebGLRenderer();

            function windowResize() {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            }
            windowResize();
            window.addEventListener('resize', windowResize);

            this.scene.appendChild(renderer.domElement);

            const pointLight = new THREE.PointLight(0xffffff,1, 100);
            pointLight.position.set(2, 0, 5);
            scene.add(pointLight);

            const spotLight = new THREE.SpotLight(0xffffff, 1);
            spotLight.position.set(2, 0, 10);
            spotLight.target.position.set(0, 0, 0);
            spotLight.angle = Math.PI / 2;
            spotLight.distance = 20;
            scene.add(spotLight);
            scene.add(spotLight.target);

            function addStar() {
                const geometry = new THREE.SphereGeometry(0.15, 15, 15);
                const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
                const star = new THREE.Mesh(geometry, material);

                const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

                star.position.set(x, y, z);
                scene.add(star);

            }
            Array(500).fill().forEach(addStar);

            const fogColor = new THREE.Color('red');
            const fogNear = 10;
            const fogFar = 80;
            scene.fog = new THREE.Fog(fogColor, fogNear, fogFar);

            

            camera.position.z = 10;

            //Input handle
            const inputElement = document.getElementById('answer');
            inputElement.addEventListener('keydown', async (event) => {
                if (event.key === 'Enter') {
                    const answer = inputElement.value;

                    if (answer === secondSecret || answer === secondSecretv2) {
                        console.log(answer + ' is correct!');
                        fadeInElement.classList.remove('fade-in');
                        await sleep(3);
                        window.location.href = '/2level';
                    }
                    else {
                        console.log('Not the correct answer.')
                    }
                }
            });

            var controls = new OrbitControls(camera, renderer.domElement);

            var animate = function () {
                requestAnimationFrame(animate);    
                controls.update();
                renderer.render(scene, camera);
            };
            animate();
        });

    }
    render() {
        const inline = {
            display: 'inline',
        }

        const inlineColor1 = {
            color: '#8F43EE',
            display: 'inline',
        }

        const color2 = {
            color: '#8F43EE',
        }


        return (
            <div>
               <div className="fade-in-from-black" >
                    <div ref={(ref) => (this.scene = ref)}></div>

                    <div id="text-container">
                        <h1 style={inline }>SOMETIMES THE </h1>
                        <h1 style={inlineColor1}> ANSWER </h1>
                        <h1 style={inline}> IS RIGHT</h1>
                        <h1 style={inlineColor1}> </h1>
                        <p style={color2}>IN FRONT OF YOU</p>
                        <p>Your zoom is limited!</p>
                        </div>

                    <div id="input-container">
                        <label >PUT YOUR ANSWER </label><span style={color2}>HERE:</span>
                        <br />
                        <input type="text" id="answer" name="answer"></input> </div>
                        <br />
               </div>
            </div>
        );
    }
}
