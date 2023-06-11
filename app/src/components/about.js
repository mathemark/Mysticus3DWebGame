import React, { Component } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { sleep } from './utils';



export default class about extends Component {
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

        const pointLight = new THREE.PointLight(0x8F43EE,1, 100);
        pointLight.position.set(2, 0, 5);
        scene.add(pointLight);

        const spotLight = new THREE.SpotLight(0x8F43EE, 1);
        spotLight.position.set(2, 0, 10);
        spotLight.target.position.set(0, 0, 0);
        spotLight.angle = Math.PI / 2;
        spotLight.distance = 20;
        scene.add(spotLight);
        scene.add(spotLight.target);

        function addStar() {
            const geometry = new THREE.SphereGeometry(0.015, 15, 15);
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

        var controls = new OrbitControls(camera, renderer.domElement);


        var animate = function () {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };
        animate();


    }
    render() {
        const h1 = {
            fontSize: '50px',
            left: '50%',
            textAlign: 'center',
        }

        const h1Color = {
            fontSize: '50px',
            color: '#8F43EE',
        }

        const color1 = {
            color:'#00ffff',
        }

        const colorH = {
            color: '#8F43EE',
            fontWeight: 'bold',
        }

        const color2 = {
            color: '#8F43EE',
        }

        const aStyle = {
            justifyContent: 'space-between',
            display: 'inline',
            fontSize: '20px',
        }

        const aStyleColor1 = {
            justifyContent: 'space-between',
            fontSize: '20px',
            display: 'inline',
            color: '#00ffff',

        }
        const aStyleColor2 = {
            justifyContent: 'space-between',
            fontSize: '20px',
            display: 'inline',
            color: '#8F43EE',

        }

        const rightAlign = {
            position: 'absolute',
            right: '25px',
        }


        return (
            <div>
               <div  >
                    <div ref={(ref) => (this.scene = ref)}></div>
                    <div className="fade-in-from-black" >
                        <div id="about-text-container">
                            <h1 style={h1}>ABOUT <span style={h1Color}>US</span> </h1>
                            <br />
                            <br />
                            <p style={aStyle}>HI I'M MARK </p> <span style={aStyleColor2}> MATHE </span> <span style={aStyle}> FROM HUNGARY. I HAVE CREATED
                                THIS GAME AS MY THESIS FOR MY IT. BACHELOR DEGREE. MY PLAN WAS TO GET FAMILIAR WITH NEW TECHNOLOGIES JUST LIKE REACT,
                                DJANGO AND OF COURSE JAVASCRIPT. IT IS NOT ABOUT RAW CODING, IT IS ABOUT</span> <span style={aStyleColor1}>CREATIVITY </span> AND <span style={aStyleColor2}> ENDURANCE.
                            </span>
                            <br />
                            <br />
                            <span style={aStyle}>CREATING ONLINE GAMES REQUIRES A UNIQUE SET OF SKILLS, INCLUDING PROGRAMMING, GAME DESIGN,
                                AND STORYTELLING. IT'S A HIGHLY CREATIVE AND REWARDING PROCESS THAT ALLOWS DEVELOPERS TO BRING THEIR IDEAS
                                TO LIFE AND SHARE THEM WITH THE WORLD. CODING AND CREATING ONLINE GAMES ARE NOT ONLY IMPORTANT FOR THEIR
                                PRACTICAL APPLICATIONS BUT ALSO FOR THE ENJOYMENT THEY PROVIDE. CODING IS A HIGHLY ENGAGING AND STIMULATING
                                ACTIVITY THAT REQUIRES PROBLEM-SOLVING SKILLS AND CREATIVE THINKING. IT ALLOWS PEOPLE TO EXPRESS THEIR IDEAS
                                IN A TANGIBLE AND MEANINGFUL WAY, WHICH CAN BE HIGHLY SATISFYING. SIMILARLY, CREATING ONLINE GAMES ALLOWS
                                DEVELOPERS TO CRAFT IMMERSIVE AND EXCITING EXPERIENCES THAT CAN CAPTIVATE PLAYERS FOR HOURS ON END.
                                <br />
                                <br />
                                IN CONCLUSION, CODING AND CREATING ONLINE GAMES ARE TWO HIGHLY IMPORTANT AND FUN ACTIVITIES THAT OFFER A
                                RANGE OF BENEFITS. THEY PROVIDE VALUABLE SKILLS THAT ARE IN HIGH DEMAND IN TODAY'S JOB MARKET, AS WELL AS
                                A SOURCE OF ENTERTAINMENT AND CREATIVITY FOR PEOPLE OF ALL AGES. WITH TECHNOLOGY CONTINUING TO ADVANCE,
                                IT'S LIKELY THAT CODING AND GAME DEVELOPMENT WILL CONTINUE TO BE HIGHLY RELEVANT AND REWARDING ACTIVITIES
                                FOR YEARS TO COME.
                                <br />
                                <br />
                                HOPE YOU GUYS WILL HAVE FUN AND ENJOY THE GAME WHAT I'VE CREATED. PLEASE CONTACT ME IF YOU HAVE ANYTHING
                                IN YOUR MIND.
                            </span>
                            <br />
                            <br />
                            <br />
                            <li style={color1}>THINK <span style={rightAlign}> MARK MATHE</span></li>
                            <li>LOOK </li>
                            <li style={color2}>ENJOY <span style={rightAlign}> eduardfawkes@gmail.com</span></li>
                            <br />
                            <br />
                            <br />
                            <br />
                            <div id="button-container">
                                <button className="button-style" id="goHome">GO <span style={colorH}>  HOME</span></button>
                            </div>
                            <br />
                        </div>
                        
                    </div>
   
               </div>
            </div>
        );
    }
}
