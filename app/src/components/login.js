import React, { Component } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import '../App.css'
import { loginUser,sleep} from './utils.js';

export default class login extends Component {
    componentDidMount() {

        //Felfédelés
        const fadeInElement = document.querySelector('.fade-in-from-black');

        window.addEventListener('load', () => {
            fadeInElement.classList.add('fade-in');
        });

        //Jelenet meghatározása
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
        renderer.setSize(window.innerWidth, window.innerHeight);
        // -------

        // Jelenet hozzáadás DOMhoz.
        this.scene.appendChild(renderer.domElement);

        //Fények létrehozása
        const pointLight = new THREE.PointLight(0x8F43EE, 1, 100);
        pointLight.position.set(2, 0, 5);
        scene.add(pointLight);

        const spotLight = new THREE.SpotLight(0x8F43EE, 1);
        spotLight.position.set(2, 0, 10);
        spotLight.target.position.set(0, 0, 0);
        spotLight.angle = Math.PI / 2;
        spotLight.distance = 20;

        scene.add(spotLight);
        scene.add(spotLight.target);



        //Csillagok hozzáadása
        function addStar() {
            const geometry = new THREE.SphereGeometry(0.015, 15, 15);
            const material = new THREE.MeshStandardMaterial({ color: 0x8F43EE });
            const star = new THREE.Mesh(geometry, material);

            const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

            star.position.set(x, y, z);
            scene.add(star);

        }

        Array(500).fill().forEach(addStar);

        //Köd hozzáadása
        const fogColor = new THREE.Color(0xffffff);
        const fogNear = 10;
        const fogFar = 50;
        scene.fog = new THREE.Fog(fogColor, fogNear, fogFar);

        //Kamera pozíciója
        camera.position.z = 10;

        //Home gomb
        const homeButton = document.getElementById("goHome");
        homeButton.addEventListener("click", async function () {
            fadeInElement.classList.remove('fade-in');
            await sleep(3);
            window.location.href = "/";
        })

        //Regisztrációs oldalra vezető gomb
        const regButton = document.getElementById("register");
        regButton.addEventListener("click", async function () {
            fadeInElement.classList.remove('fade-in');
            await sleep(3);
            window.location.href = "/register";
            
        });

        //Jelszónál való enter leütés aktiválja a bejelntkezés gombot. 
        const password = document.getElementById("password")
        password.addEventListener('keydown', async (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                loginButton.click();
            }
        });
       
        const loginButton = document.getElementById("login");
        //Login user
        loginButton.addEventListener("click", async function () {
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            const credentials = {
                username: username,
                password: password
            };

            loginUser(credentials, username);
        });

        //Kamera vezérlés létrhozása
        var controls = new OrbitControls(camera, renderer.domElement);

        //Animációk létrehozása
        var animate = function () {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };
        animate();

    }

    //Egyedi stílusok hozzáadása a felülethez
    render() {
        const h1 = {
            fontSize: '50px',
            left: '50%',
            textAlign: 'center',
        }

        const colorH = {
            color: '#8F43EE',
            fontWeight: 'bold',
        }

        const aStyle = {
            justifyContent: 'space-between',
            display: 'inline',
            fontSize: '16px',
        }

        const aStyleColor1 = {
            justifyContent: 'space-between',
            fontSize: '16px',
            display: 'inline',
            color: '#00ffff',

        }
        const aStyleColor2 = {
            justifyContent: 'space-between',
            fontSize: '16px',
            display: 'inline',
            color: '#8F43EE',

        }



        return (
            <div>
                <div  >
                    <div ref={(ref) => (this.scene = ref)}></div>
                        <div className="fade-in-from-black" >
                            <div id="reg-main-text-container">
                                

                                    <h1 style={h1}> LOGIN </h1>
                                    <br />
                                    <br />
                                <p style={aStyle}>THIS </p>  <span style={aStyle}>LOGIN PAGE WILL AUTOMATICLY</span> <span style={aStyleColor1}> REDIRECT YOU </span>
                                TO THE  <span style={aStyleColor2}>LEVEL </span> <span style={aStyle}> YOU WERE AT LAST TIME.</span>
                                    <br />
                                    <br />
                                    <br />
                                <br />
                                <div id="register-text-container">
                                    <p style={aStyle}>USERNAME </p><br />
                                    <input type="text" id="username" className="reg-input"></input><br />
                                    <p style={aStyle}>PASSWORD </p><br />
                                    <input type="password" id="password" className="reg-input"></input>
                                    <br /><br /><br /><br /><br /><br />
                                    <div id="button-container">
                                        <button className="button-style-small" id="register" name="register">REGISTER</button>
                                        <button className="button-style" id="goHome" name="goHome">GO <span style={colorH}>  HOME</span></button>
                                        <button className="button-style" id="login" name="login">LOGIN</button>
                                    </div>
                                </div>
                            </div>   
                        </div>

                </div>
            </div>
        );
    }
}
