import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })


export default defineConfig(({ command, mode, ssrBuild }) => {
  const env = loadEnv(mode, process.cwd(), '');

  console.log('command:', command);

  if (command === 'serve') {
    return {
      plugins: [react()],
      define: {
        __APP_ENV__: JSON.stringify(env.BASE_URl),
      },
    }
  } else {
    // command === 'build'
    return {
      plugins: [react()],
    }
  }
})
