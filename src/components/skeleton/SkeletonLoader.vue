<template>
  <div class="animate-pulse min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
    <header class="sticky top-0 z-50 backdrop-blur-xl bg-white/10 border-b border-white/20">
      <div class="max-w-7xl  px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex items-center justify-between">
          <div class="w-32 h-10 bg-white/20 rounded-full"></div>
          <div class="w-40 h-6 bg-white/20 rounded-full"></div>
          <div class="w-10 h-10 bg-white/20 rounded-full"></div>
        </div>
      </div>
    </header>

    <section class="relative h-[400px] flex items-center overflow-hidden">
      <div class="absolute inset-0 bg-gray-300 opacity-10"></div>
      <div class="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
        <div class="mb-6 mt-2 w-32 h-6 bg-white/20 rounded-full"></div>
        <div class="w-3/4 h-10 bg-white/20 rounded-lg mb-4"></div>
        <div class="w-full h-6 bg-white/20 rounded mb-4"></div>
        <div class="flex items-center gap-4 mb-4">
          <div class="w-16 h-16 bg-white/20 rounded-full"></div>
          <div class="flex-1 space-y-2">
            <div class="w-1/2 h-4 bg-white/20 rounded"></div>
            <div class="w-3/4 h-4 bg-white/20 rounded"></div>
          </div>
        </div>
        <div class="grid grid-cols-3 gap-4">
          <div class="h-16 bg-white/20 rounded-lg"></div>
          <div class="h-16 bg-white/20 rounded-lg"></div>
          <div class="h-16 bg-white/20 rounded-lg"></div>
        </div>
      </div>
    </section>

    <section class="bg-white py-16">
      <div class="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2 space-y-4">
          <div class="h-10 bg-gray-200 rounded w-1/2"></div>
          <div class="space-y-2">
            <div class="h-6 bg-gray-200 rounded w-full"></div>
            <div class="h-6 bg-gray-200 rounded w-3/4"></div>
            <div class="h-6 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
        <div class="space-y-4">
          <div class="h-32 bg-gray-200 rounded-xl"></div>
          <div class="h-32 bg-gray-200 rounded-xl"></div>
        </div>
      </div>
    </section>
  </div>
</template>
