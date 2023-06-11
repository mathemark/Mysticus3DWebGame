import React, { Component } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { firstSecret,firstSecretv2 } from './secrets';
import { sleep } from './utils';


export default class firstlevel extends Component {
    componentDidMount() {

        const fontLoader = new THREE.FontLoader();

        const fadeInElement = document.querySelector('.fade-in-from-black');

        window.addEventListener('load', () => {
            fadeInElement.classList.add('fade-in');
        });

        fontLoader.load('https://threejs.org/examples/fonts/optimer_regular.typeface.json', (font) => {

            var scene = new THREE.Scene();
            var camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);
            var renderer = new THREE.WebGLRenderer();

            //Handle windows resize
            function windowResize() {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            }

            windowResize();
            window.addEventListener('resize', windowResize);
            //Handle windows resize

            //add this scene to DOM
            this.scene.appendChild(renderer.domElement);

            //Add point and spotlight to the scene
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
            //Add point and spotlight to the scene

            //add star elements
            function addStar() {
                const geometry = new THREE.SphereGeometry(0.15, 15, 15);
                const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
                const star = new THREE.Mesh(geometry, material);

                const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

                star.position.set(x, y, z);
                scene.add(star);

            }
            //Fill the area with stars
            Array(500).fill().forEach(addStar);

            //Make stars more visiable
            const fogColor = new THREE.Color(0xffffff);
            const fogNear = 10;
            const fogFar = 50;
            scene.fog = new THREE.Fog(fogColor, fogNear, fogFar);

            //Create cube
            var geometry = new THREE.BoxGeometry(1, 2, 2);
            const edges = new THREE.EdgesGeometry(geometry);
            const cube = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({
                color: 0x00ffff,}));
            scene.add(cube);
            
            //set camera position
            camera.position.z = 7;

            //Create input event
            const inputElement = document.getElementById('answer');

            inputElement.addEventListener('keydown', async (event) => {
                if (event.key === "Enter") {
                    const answer = inputElement.value;

                    if (answer === firstSecret || answer === firstSecretv2) {
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

            //Create text on cube
            function createText(textContent) {
                const textGeometry = new THREE.TextGeometry(textContent, {
                    font,
                    size: 0.1,
                    height: 0.025,
                    curveSegments: 12,
                    bevelEnabled: true,
                    bevelThickness: 0,
                    bevelSize: 0,
                    bevelSegments: 0,
                });

                const textMaterial = new THREE.MeshStandardMaterial({
                    color: 0x00ffff,
                    metalness: 0.2,
                    roughness: 1,

                });

                const textMesh = new THREE.Mesh(textGeometry, textMaterial);
                textMesh.position.set(0.48, 0, 0.6);
                textMesh.rotation.y += 1.57;

                return textMesh;
            }

            const answerText = createText('Your answer will be: \n      Lorem ipsum');
            cube.add(answerText);

            //Add OrbitControls to the scene
            var controls = new OrbitControls(camera, renderer.domElement);

            var animate = function () {
                requestAnimationFrame(animate);
                cube.rotation.x += 0.005;
                cube.rotation.y += 0.005;
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

        const color1 = {
            color:'#00ffff',
        }

        const color2 = {
            color: '#8F43EE',
        }


        return (
            <div>
               <div className="fade-in-from-black" >
                    <div ref={(ref) => (this.scene = ref)}></div>

                    <div id="text-container">
                        <h1 style={inline }>TEST THE </h1>
                        <h1 style={inlineColor1}> GAME </h1>
                        <h1 style={inline}> AND YOUR </h1>
                        <h1 style={inlineColor1}> ABILITES</h1>
                        <p>THIS GAME IS ALL ABOUT SUPRISES.</p>
                        <li style={color1}>THINK</li>
                        <li>LOOK</li>
                        <li style={color2}>FIND</li></div>

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
