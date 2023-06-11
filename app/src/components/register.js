import React, { Component } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import '../App.css'
import { registerUser, sleep, validatePassword } from './utils';


export default class register extends Component {
    componentDidMount() {

        const fadeInElement = document.querySelector('.fade-in-from-black');

        window.addEventListener('load', () => {
            fadeInElement.classList.add('fade-in');
        });

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

        const listener = new THREE.AudioListener();
        camera.add(listener);

        const pointLight = new THREE.PointLight(0x8F43EE, 1, 100);
        pointLight.position.set(2, 0, 5);
        scene.add(pointLight);

        function addStar() {
            const geometry = new THREE.SphereGeometry(0.075, 15, 15);
            const material = new THREE.MeshStandardMaterial({ color: 0x8F43EE });
            const star = new THREE.Mesh(geometry, material);

            const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

            star.position.set(x, y, z);
            scene.add(star);

        }
        Array(500).fill().forEach(addStar);

        const fogColor = new THREE.Color(0xffffff);
        const fogNear = 10;
        const fogFar = 50;
        scene.fog = new THREE.Fog(fogColor, fogNear, fogFar);

        camera.position.z = 10;

        const button = document.getElementById("goHome");
        button.addEventListener("click", async function () {
            fadeInElement.classList.remove('fade-in');
            await sleep(3);
            window.location.href = "/";
        })

        //Registration button with password validation
        const regButton = document.getElementById("register");
        regButton.addEventListener("click", async function () {
            const password = document.getElementById("password").value;
            const confirmPassword = document.getElementById("confirm_password").value;

            if (validatePassword(password, confirmPassword)) {
                const usernameI = document.getElementById("username").value;
                const emailI = document.getElementById("email").value;
                const firstNameI = document.getElementById("first_name").value;
                const lastNameI = document.getElementById("last_name").value;
                const passwordI = document.getElementById("password").value;

                const newUser = {
                    username: usernameI,
                    first_name: firstNameI,
                    last_name: lastNameI,
                    email: emailI,
                    password: passwordI,
                    levelAt: '/firstlevel'
                };
                /* Felhasználó regisztrálása, az elsötétedő háttér és a várokozás fuknciók
                 keresztül küldése */
                registerUser(newUser,fadeInElement,sleep);
            }
        });


        var controls = new OrbitControls(camera, renderer.domElement);


        var animate = function () {
            requestAnimationFrame(animate);
            controls.update();
            //Array(500).fill().forEach(addStar);
            renderer.render(scene, camera);
        };
        animate();

    }
    render() {
        
        // Egyedi css stílusok integrálása a render függvénybe. 
        const h1 = {
            fontSize: '50px',
            left: '50%',
            textAlign: 'center',
        }

        const h1Color = {
            fontSize: '50px',
            color: '#8F43EE',
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
                            

                                <h1 style={h1}>REGISTER <span style={h1Color}>HERE</span> </h1><br /><br />
                            <p style={aStyle}>PLEASE  REGISTER </p>  <span style={aStyle}>IF YOU WANT TO</span> <span style={aStyleColor1}>SAVE YOUR PROGRESS </span>
                                AND HELP US TO <span style={aStyleColor2}>DEVELOPE.</span> <br /><br /><br />
                            <br />
                            <div id="register-text-container">
                                <form>
                                <p style={aStyle}>USERNAME* </p><br />
                                <input type="text" id="username" className="reg-input"></input><br />
                                <p style={aStyle}>EMAIL* </p><br />
                                <input type="email" id="email" className="reg-input"></input><br />
                                <p style={aStyle}>PASSWORD* </p><br />
                                <input type="password" id="password" className="reg-input"></input><br />
                                <p style={aStyle}>PASSWORD AGAIN* </p><br />
                                <input type="password" id="confirm_password" className="reg-input"></input><br />
                                <p style={aStyle}>FIRST NAME </p><br />
                                <input type="text" id="first_name" className="reg-input"></input><br />
                                <p style={aStyle}>LAST NAME </p><br />
                                <input type="text" id="last_name" className="reg-input"></input>
                                </form><br /><br /><br />
                                    <div id="button-container">
                                        <button className="button-style" id="goHome" name="goHome">GO <span style={colorH}>  HOME</span></button>
                                        <button className="button-style" id="register" name="register">REGISTER</button>
                                    </div><br />
                            </div>
                            </div>   
                        </div>

                </div>
            </div>
        );
    }
}
