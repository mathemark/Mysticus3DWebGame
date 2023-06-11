import React, { Component } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { sleep, continueUser } from './utils';

import EF_77 from './music/77.mp3';
import * as dat from 'dat.gui';


export default class home extends Component {


    componentDidMount() {

        const fadeInOutElement = document.querySelector('.fade-in-from-black');

        window.addEventListener('load', () => {
            fadeInOutElement.classList.add('fade-in');  
        });

        const fontLoader = new THREE.FontLoader();

        

        // fontloader sending through
        fontLoader.load('https://threejs.org/examples/fonts/optimer_regular.typeface.json', (font) => {

            //Define the scene
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
            // ---------

            //Add this scene to the DOM
            this.scene.appendChild(renderer.domElement);

            //Audio listener to camera
            const listener = new THREE.AudioListener();
            camera.add(listener);

            //add point lights to scene
            const pointLight = new THREE.PointLight(0xFAEAB1, 1, 50);
            pointLight.position.set(0, 0, 20);
            scene.add(pointLight);

            const pointLightBack = new THREE.PointLight(0xFAEAB1, 1, 50);
            pointLightBack.position.set(-5, 0, -20);
            scene.add(pointLightBack);

            const pointLightHelper = new THREE.PointLightHelper(pointLight, 1);
            scene.add(pointLightHelper);
            // ---------




            //add star elements
            function addStar() {
                const geometry = new THREE.SphereGeometry(0.15, 15, 15);
                const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
                const star = new THREE.Mesh(geometry, material);

                const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

                star.position.set(x, y, z);
                scene.add(star);

            }

            //Fill the scene with stars
            Array(500).fill().forEach(addStar);

            //Make stars more visiable
            const fogColor = new THREE.Color(0xffffff);
            const fogNear = 10;
            const fogFar = 50;
            scene.fog = new THREE.Fog(fogColor, fogNear, fogFar);

            //Create stop button
            var geometry = new THREE.BoxGeometry(1, 2, 2);

            var material = new THREE.MeshStandardMaterial({
                color: 0x00ffff,
                emissive: 0xFAEAB1,
                emissiveIntensity: 0.2,
                metalness: 1,
                roughness: 0.5,
            });
            var cube = new THREE.Mesh(geometry, material);
           
            cube.position.x -= 4;
            scene.add(cube);
            // ---------


            // Create play button
            var triangleMaterial = new THREE.MeshStandardMaterial({
                color: 0x8F43EE,
                emissive: 0xFAEAB1,
                emissiveIntensity: 0.2,
                metalness: 1,
                roughness: 0.5,
            });

            const triangleShape = new THREE.Shape();

                // Define the geometry of the shape by adding points
            triangleShape.moveTo(0, 0);
            triangleShape.lineTo(0, 2);
            triangleShape.lineTo(2, 1);
            triangleShape.lineTo(0, 0);

                // Define the extrusion settings
            const extrudeSettings = {
                steps: 1,
                depth: 1,
                bevelEnabled: false
            };

                // Create the geometry by extruding the shape
            const triangleGeometry = new THREE.ExtrudeGeometry(triangleShape, extrudeSettings);

            const triangleMesh = new THREE.Mesh(triangleGeometry, triangleMaterial);

            triangleMesh.position.x -= 1;
            triangleMesh.position.y -= 1;
            scene.add(triangleMesh)
            // ---------

            //Create pause button
            var pauseGeo = new THREE.BoxBufferGeometry(0.5, 2, 1);
            var pauseGeo2 = pauseGeo.clone()
            pauseGeo2.translate(1, 0, 0);
            const pauseMerge = BufferGeometryUtils.mergeBufferGeometries([pauseGeo, pauseGeo2]);
            var pause = new THREE.Mesh(pauseMerge, material);
            scene.add(pause);
            pause.position.x += 3;
            // ---------
     

            

            //Create text creation function
            function createText(textContent) {
                const textGeometry = new THREE.TextGeometry(textContent, {
                    font,
                    size: 1,
                    height: 1,
                    curveSegments: 50,
                    bevelEnabled: true,
                    bevelThickness: 1,
                    bevelSize: 0.05,
                    bevelOffset: 0,
                    bevelSegments: 0,

                });

                const textMaterial = new THREE.MeshStandardMaterial({
                    color: 0x5D6D7E,
                    emissive: 0x00ffff,
                    emissiveIntensity: 0.2,
                    metalness: 1,
                    roughness: 0.7,
                });

                const textMesh = new THREE.Mesh(textGeometry, textMaterial);
                textMesh.position.set(-3.5, -1, 5);
                textMesh.position.y += 2;
                textMesh.rotation.x += 0.2;

                return textMesh;
            }

            //Create 3D texts
            const newGametext = createText('NEW GAME');
            scene.add(newGametext);

            const continueText = createText('CONTINUE');
            continueText.position.set(-3.5, -4, 5);
            continueText.position.y += 2;
            continueText.rotation.x -= 0.4;
            scene.add(continueText);

            const registerText = createText('REGISTER');
            registerText.position.set(3, -1, -5);
            registerText.position.y += 2;
            registerText.rotation.y -= 3.15;
            registerText.rotation.x -= 0.4;
            scene.add(registerText);

            const aboutUsText = createText('ABOUT US');
            aboutUsText.position.set(3.5, -4, -5);
            aboutUsText.position.y += 2;
            aboutUsText.rotation.y -= 3.15;
            aboutUsText.rotation.x += 0.05;
            scene.add(aboutUsText);
            //---------


            
            //Create music player funciton
            const music = new THREE.Audio(listener);
            const audioLoader = new THREE.AudioLoader();
            audioLoader.load(EF_77, function (buffer) {

                music.setBuffer(buffer);
                music.setLoop(true);
                music.setVolume(0.5);
            });
                //Define base volume state
            const volumeController = new function () {
                this.volume = 0.5;
            }();
                //Create volume controller 
            const gui = new dat.GUI();
            gui.add(volumeController, 'volume', 0.0, 1.0).onChange((value) => {
                music.setVolume(value);
            }).name("Volume");
        
                //Set gui position
            gui.domElement.style.position = 'fixed';
            gui.domElement.style.bottom = '20px';
            gui.domElement.style.right = '10px';
            // ---------

            
            // Find 3D objects in the menu
                // Define raycaster
            const raycaster = new THREE.Raycaster();

                // Mouse object
            const mouse = new THREE.Vector2();
            this.scene.addEventListener('click', async (event) => {

                    // Calculate the position of the mouse in normalized device coordinates
                mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
                mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

                    // Cast a ray from the camera to the clicked position
                raycaster.setFromCamera(mouse, camera);

                    // Find all the intersected objects
                const intersects = raycaster.intersectObjects(scene.children);


                    // Loop through the intersected objects
                for (let i = 0; i < intersects.length; i++) {
                    if (intersects[i].object === triangleMesh) {

                        if (music.isPlaying) {
                            console.log('Music is already playing.');
                        }
                        else {
                            music.play();
                        }

                    }
                }

                for (let i = 0; i < intersects.length; i++) {
                    if (intersects[i].object === cube) {

                        music.stop();
                        console.log('Music has stoped!');
                    }
                }

                for (let i = 0; i < intersects.length; i++) {
                    if (intersects[i].object === pause) {


                        music.pause();
                        console.log('Music has paused!');
                    }
                }

                for (let i = 0; i < intersects.length; i++) {
                    if (intersects[i].object === newGametext) {


                        fadeInOutElement.classList.remove('fade-in');
                        await sleep(3);
                        alert('Just to be clear. Without registration your game progress will NOT be stored. Please register if you want to save your progress.')
                        window.location.href = '/firstlevel'
                    }
                }


                for (let i = 0; i < intersects.length; i++) {
                    if (intersects[i].object === continueText) {

                        if (localStorage.getItem('username')) {
                            continueUser();
                            
                        }
                        fadeInOutElement.classList.remove('fade-in');
                        await sleep(3);
                        window.location.href = '/login'
                    }
                }
            

                for (let i = 0; i < intersects.length; i++) {
                    if (intersects[i].object === registerText) {

                        fadeInOutElement.classList.remove('fade-in');
                        await sleep(3);
                        window.location.href = '/register'
                    }
                }

                for (let i = 0; i < intersects.length; i++) {
                    if (intersects[i].object === aboutUsText) {

                        fadeInOutElement.classList.remove('fade-in');
                        await sleep(3);
                        window.location.href = '/about'
                    }
                }

            });

            // Create base positions for animations
            const textNGInitialY = newGametext.position.y;
            const triangleInitialX = triangleMesh.rotation.x;
            const triangleInitialy = triangleMesh.rotation.y;
            const pointLightX = pointLight.position.x;
            const pointLightBackX = pointLight.position.x;

            //Define times for animations
            let time = 0;
            let triangleTime = 0;

            //Set camere position and Orbit controls
            camera.position.z = 10;
            var controls = new OrbitControls(camera, renderer.domElement);


            var animate =  async function () {
                requestAnimationFrame(animate);
                pause.rotation.x += 0.01;
                cube.rotation.y -= 0.01;
                controls.update();
                time += 0.01;
                triangleTime += 0.009;
                newGametext.position.y = textNGInitialY + Math.sin(time) * 0.1;
                pointLight.position.x = pointLightX + Math.sin(time) * 5;
                pointLightBack.position.x = pointLightBackX + Math.sin(time) * -5;
                triangleMesh.rotation.x = triangleInitialX + Math.sin(time) * 0.2;
                triangleMesh.rotation.y = triangleInitialy - Math.sin(triangleTime) * 0.2;
                renderer.render(scene, camera);
            };
            animate();
        });
    }

    render() {
        return (
            <div>
                <div className="fade-in-from-black" >
                    <div ref={(ref) => (this.scene = ref)}></div>
                </div>

            </div>
        );
    }
}
