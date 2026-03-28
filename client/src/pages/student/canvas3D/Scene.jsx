import { Suspense, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Book from './Book';
import { Canvas, useThree } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import { Leva } from 'leva';
import { useSpring } from '@react-spring/three';
import { useMediaQuery } from 'react-responsive';

const CameraController = ({ activeTarget, cameraPositions }) => {
  const { camera } = useThree();

  const targetPosition = activeTarget ? cameraPositions[activeTarget] : [15, 20, 50];

  const { camPos } = useSpring({
    camPos: targetPosition,
    config: { mass: 5, tension: 90, friction: 30 },
    onChange: ({ value }) => {
      camera.position.set(...value.camPos);
    },
  });

  useEffect(() => {
    camera.position.set(...targetPosition);
  }, [activeTarget]);

  return null;
};

const Scene = () => {
  const [activeTarget, setActiveTarget] = useState(null);
  const [one, setOne] = useState(false);
  const [two, setTwo] = useState(false);
  const [three, setThree] = useState(false);
  const navigate = useNavigate();

  // Media queries
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });
  const isDesktop = useMediaQuery({ minWidth: 1025 });

  const handleClick = (id) => {
    setActiveTarget(prev => (prev === id ? null : id));
    if (id === 1) setOne(!one);
    else if (id === 2) setTwo(!two);
    else setThree(!three);
  };

  const cameraPositions = {
    1: isMobile ? [10, 9, 13] : isTablet ? [12.85, 9.85, 18] : [12.85, 9.85, 10.60],
    2: isMobile ? [25, 7, -20] : [28.40, 7.95, -16],
    3: isMobile ? [-15, 20, -30] : isTablet ? [-15, 18, -28] : [0.90, 18, -28],
  };

  const btnClass = "w-32 min-h-[2.5rem] p-2 bg-blue-600 text-white text-center cursor-pointer rounded-md font-bold";
  const pingBall = "relative bg-red-500 rounded-full w-4 h-4 cursor-pointer text-white flex items-center justify-center text-sm before:content-[''] before:absolute before:inset-0 before:rounded-full before:bg-red-500 before:opacity-75 before:animate-ping before:-z-10";

  return (
    <div className="h-screen w-full bg-white dark:bg-[var(--secondary-color)]">
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <OrbitControls />
        <Suspense fallback={null}>
          <Book />
        </Suspense>

        <CameraController activeTarget={activeTarget} cameraPositions={cameraPositions} />

        {/* Red Ball 1 */}
        <group position={isMobile ? [8, 9, 10] : [0, 9, 10]}>
          <Html center>
            <div className="flex flex-col justify-center items-center gap-2">
              <div onClick={() => navigate("/login")}>
                <div className={`${btnClass} ${one ? 'block' : 'hidden'}`}>Login</div>
              </div>
              <div onClick={() => handleClick(1)} className={pingBall}>1</div>
            </div>
          </Html>
        </group>

        {/* Red Ball 2 */}
        <group position={[15, 10, -15]}>
          <Html center>
            <div className="flex flex-col justify-center items-center gap-2">
              <div onClick={() => navigate("/profile")}>
                <div className={`${btnClass} ${two ? 'block' : 'hidden'}`}>Profile</div>
              </div>
              <div onClick={() => handleClick(2)} className={pingBall}>2</div>
            </div>
          </Html>
        </group>

        {/* Red Ball 3 */}
        <group position={[-10, 12, -17]}>
          <Html center>
            <div className="flex flex-col justify-center items-center gap-2">
              <div onClick={() => navigate("/landing")}>
                <div className={`${btnClass} ${three ? 'block' : 'hidden'}`}>
                 Courses
                </div>
              </div>
              <div onClick={() => handleClick(3)} className={pingBall}>3</div>
            </div>
          </Html>
        </group>
      </Canvas>
      <Leva />
    </div>
  );
};

export default Scene;
