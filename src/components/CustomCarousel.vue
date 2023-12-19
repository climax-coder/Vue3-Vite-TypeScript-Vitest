<template>
  <Carousel :itemsToShow="itemsToShow" :wrapAround="true" :transition="500">
    <Slide v-for="(image, index) in images" :key="index">
      <div class="carousel__item">
        <img :src="image" alt="...">
      </div>
    </Slide>
    <template #addons>
      <Navigation />
      <Pagination />
    </template>
  </Carousel>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted, PropType } from 'vue';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';

export default defineComponent({
  name: 'CustomCarousel',
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
  props: {
    images: {
      type: Array as PropType<string[]>,
      required: true
    }
  },
  setup() {
    const itemsToShow = ref(2.5);

    const updateItemsToShow = () => {
      if (window.matchMedia('(max-width: 767px)').matches) {
        itemsToShow.value = 0.5;
      } else {
        itemsToShow.value = 2.5;
      }
    };

    onMounted(() => {
      updateItemsToShow();
      window.addEventListener('resize', updateItemsToShow);
    });

    onUnmounted(() => {
      window.removeEventListener('resize', updateItemsToShow);
    });

    return { itemsToShow };
  }
});
</script>

<style scoped>
.carousel__slide {
  padding: 5;
}

.carousel__item img {
  border-radius: 20px;
}

.carousel__viewport {
  perspective: 2000px;
}

.carousel__track {
  transform-style: preserve-3d;
}

.carousel__slide--sliding {
  transition: 0.5s;
}

.carousel__slide {
  opacity: 0.9;
  transform: rotateY(-20deg) scale(0.9);
}

.carousel__slide--active~.carousel__slide {
  transform: rotateY(20deg) scale(0.9);
}

.carousel__slide--prev {
  opacity: 1;
  transform: rotateY(-10deg) scale(0.95);
}

.carousel__slide.carousel__slide--next {
  opacity: 1;
  transform: rotateY(10deg) scale(0.95);
}

.carousel__slide--active {
  opacity: 1;
  transform: rotateY(0) scale(1);
}

@media (max-width: 568px) {
  .carousel__item img {
    width: 400px;
  }
}
</style>