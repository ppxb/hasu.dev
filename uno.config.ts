import { defineConfig, presetAttributify, presetIcons, presetUno } from 'unocss'

export default defineConfig({
    theme: {
        fontFamily: {
            sans: '"Inter",serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji'
        }
    },
    presets: [
        presetUno(),
        presetAttributify({
            strict: true
        }),
        presetIcons({
            scale: 1.2,
            warn: true,
        }),
    ],
})
