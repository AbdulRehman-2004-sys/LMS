import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import * as THREE from "three";
import WAVES from "vanta/dist/vanta.halo.min.js";

const HeroSection = () => {

  const vantaRef = useRef(null)

  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const searchHandler = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/course/search?query=${searchQuery}`)
    }
    setSearchQuery("");
  }

  useEffect(() => {

    const vantaEffect = WAVES({
      el: vantaRef.current,
      THREE,
      minHeight: 200.0,
      minwidth: 200.0,
      highlightColor: 0xffc300,
      midtoneColor: 0xff1f00,
      lowlightColor: 0x2d00ff,
      baseColor: 0xffebeb,
      blurFactor: 0.6,
      zoom: 1,
      speed: 1

    })
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);


  return (
    <div ref={vantaRef} className="relative py-24 px-4 text-center h-screen">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-white text-5xl font-bold mb-4">
          Unlock Your Potential with the Right Course
        </h1>
        <p className="text-white mb-8">
          Discover, Learn, and Upskill with our wide range of courses
        </p>

        <form onSubmit={searchHandler} className="flex items-center bg-white dark:bg-[var(--secondary-color)] rounded-full shadow-lg overflow-hidden max-w-xl mx-auto mb-6">
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Courses"
            className="flex-grow px-6 py-3"
          />
          <Button type="submit" className="bg-[var(--primary-color)] text-white px-6 py-3 rounded-r-full hover:bg-[var(--primary-color)]">Search</Button>
        </form>
        <Button onClick={() => navigate(`/course/search?query`)} className="text-white rounded-full bg-[var(--secondary-color)]">Explore Courses</Button>
      </div>
    </div>
  );
};

export default HeroSection;
