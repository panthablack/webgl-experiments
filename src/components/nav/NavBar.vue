<script setup lang="ts">
import NavBarLink from '@/components/nav/NavBarLink.vue'
</script>

<template>
  <nav class="navBar p-4 flex flex-no-wrap gap-y-4 gap-x-6 bg-gray-700">
    <NavBarLink to="/webgl">WebGL</NavBarLink>
    <NavBarLink to="/webgl/empty">WebGL Empty</NavBarLink>
    <NavBarLink to="/webgl/blank-plane">Blank Plane</NavBarLink>
    <NavBarLink to="/webgl/coloured-plane">Coloured Plane</NavBarLink>
    <NavBarLink to="/webgl/custom-shaders">Custom Shaders</NavBarLink>
    <NavBarLink to="/webgl/animated-plane">Animation</NavBarLink>
    <NavBarLink to="/webgl/3d">3D Rendering</NavBarLink>
  </nav>
</template>