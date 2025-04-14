export const simulationVertexShader = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelMatrix * vec4(position, 1.0);
}
`

export const simulationFragmentShader = `
uniform sampler2D textureA;
uniform vec2 mouse;
uniform vec2 resolution;
uniform float time;
uniform int frame;
varying vec2 vUv;

const float delta = 1.4;

// Random function for generating ripple positions
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
    vec2 uv = vUv;
    if (frame == 0) {
        gl_FragColor = vec4(0.0);
        return;
    }

    vec4 data = texture2D(textureA, uv);
    float pressure = data.x;
    float pVel = data.y;

    vec2 texelSize = 1.0 / resolution;
    float p_right = texture2D(textureA, uv + vec2(texelSize.x, 0.0)).x;
    float p_left = texture2D(textureA, uv + vec2(-texelSize.x, 0.0)).x;
    float p_up = texture2D(textureA, uv + vec2(0.0, texelSize.y)).x;
    float p_down = texture2D(textureA, uv + vec2(0.0, -texelSize.y)).x;

    if (uv.x <= texelSize.x) p_left = p_right;
    if (uv.x >= 1.0 - texelSize.x) p_right = p_left;
    if (uv.y <= texelSize.y) p_down = p_up;
    if (uv.y >= 1.0 - texelSize.y) p_up = p_down;

    pVel += delta * (-2.0 * pressure + p_right + p_left) / 4.0;
    pVel += delta * (-2.0 * pressure + p_up + p_down) / 4.0;

    pressure += delta * pVel;

    pVel -= 0.005 * delta * pressure;

    pVel *= 1.0 - 0.01 * delta;
    pressure *= 0.999;

    // Mouse interaction
    vec2 mouseUv = mouse / resolution;
    if (mouse.x > 0.0) {
        float dist = distance(uv, mouseUv);
        if (dist <= 0.02) {
            pressure += 2.0 * (1.0 - dist / 0.02);
        }
    }

    // Random ripples
    float timeInterval = mod(time, 3.0); // Create ripple every 3 seconds
    if (timeInterval < 0.1) { // Small window to create ripple
        vec2 rippleCenter = vec2(
            0.2 + 0.6 * random(vec2(time, 0.0)), // Random x between 0.2 and 0.8
            0.2 + 0.6 * random(vec2(0.0, time))  // Random y between 0.2 and 0.8
        );
        float rippleDist = distance(uv, rippleCenter);
        float rippleStrength = 0.8; // Softer ripple than mouse interaction
        if (rippleDist <= 0.03) {
            pressure += rippleStrength * (1.0 - rippleDist / 0.03) * (1.0 - timeInterval / 0.1);
        }
    }

    gl_FragColor = vec4(pressure, pVel, 
    (p_right - p_left) / 2.0, 
    (p_up - p_down) / 2.0);
}
`

export const renderVertexShader = `
varying vec2 vUv;

void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

export const renderFragmentShader = `
uniform sampler2D textureA;
uniform sampler2D textureB;
uniform sampler2D backgroundTexture;
uniform float time;
uniform float aspectRatio;
uniform float screenRatio;
varying vec2 vUv;

void main() {
    vec2 uv = vUv;
    
    // Create wave distortion for background
    float waveX = sin(uv.y * 10.0 + time * 1.5) * 0.002;
    float waveY = cos(uv.x * 8.0 + time) * 0.002;
    vec2 waveDistortion = vec2(waveX, waveY);
    
    // Get distortion data from simulation (mouse ripples)
    vec4 data = texture2D(textureA, uv);
    vec2 rippleDistortion = 0.08 * data.zw;
    
    // Simple object-cover implementation
    // For the background image to cover the entire container while maintaining aspect ratio
    vec2 bgUv = uv;
    
    // Add ripple and wave effects
    bgUv += waveDistortion + rippleDistortion * 0.5;
    
    // Calculate scaling to match true CSS object-cover behavior
    // Based on image inspection, our water3.jpg has aspect ratio ~1.5 (landscape)
    float imageAspect = 1.5; 
    
    // Add a small zoom factor for safety (ensures no edges are visible)
    float safetyScale = 1.1;
    
    // Properly implement object-cover
    if (aspectRatio > imageAspect) {
        // Screen is wider than image - scale based on width and ensure full height coverage
        float scale = (aspectRatio / imageAspect) * safetyScale;
        bgUv.y = (bgUv.y - 0.5) / scale + 0.5;
    } else {
        // Screen is taller than image - scale based on height and ensure full width coverage
        float scale = (imageAspect / aspectRatio) * safetyScale;
        bgUv.x = (bgUv.x - 0.5) / scale + 0.5;
    }
    
    // Sample the background texture (clamping happens automatically with ClampToEdgeWrapping)
    vec4 bgColor = texture2D(backgroundTexture, bgUv);
    
    // Sample the text with combined distortion
    vec4 textColor = texture2D(textureB, uv + rippleDistortion);
    
    // Calculate light effects
    vec3 normal = normalize(vec3(-data.z * 2.0, 0.5, -data.w * 2.0));
    vec3 lightDir = normalize(vec3(-3.0, 10.0, 3.0));
    float specular = pow(max(0.0, dot(normal, lightDir)), 30.0) * 0.3;
    
    // Blend text over background using text alpha
    vec4 finalColor = mix(bgColor, textColor, textColor.a);
    
    // Add subtle specular highlights to areas with text
    finalColor.rgb += vec3(specular) * textColor.a;
    
    gl_FragColor = finalColor;
}
`
