<template>
  <div class="symptom-input-container professional">
    <div class="prompt-card elevated">
      <svg class="icon info-icon" viewBox="0 0 24 24">
        <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-4h2v-6h-2v6zm0-8h2V7h-2v2z"/>
      </svg>
      <h3 class="prompt-title primary-text">Tell Us About Your Symptoms</h3>
      <p class="prompt-description secondary-text">Please provide a detailed description of what you're feeling. The more specific you are, the better we can understand.</p>
    </div>
    <div
      class="input-box focused-style"
      @click="focusInput"
    >
      <textarea
        ref="symptomInput"
        v-model="inputText"
        placeholder=""
        id="symptomInput"
      ></textarea>
      <label
        for="symptomInput"
        class="input-label"
        :class="{ 'has-text': inputText }"
      >Describe your symptoms...</label>
    </div>
    <div class="hint-area">
      <small class="hint-text subtle">Example: "Persistent cough with chest tightness, especially at night."</small>
    </div>
    <button class="submit-button primary-button" @click="generateJson">Submit Symptoms</button>
    <div class="additional-info">
      <p class="info-text"><svg class="small-icon light-blue" viewBox="0 0 24 24"><path fill="currentColor" d="M13 9h-2V3H9v2l-1.65 1.65A2 2 0 0 0 6 6v6h2v7h4V12h2V9z"/></svg> Providing accurate details helps us give you the best possible information.</p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'SymptomInput',
  setup() {
    const inputText = ref('');
    const symptomInput = ref(null);

    const focusInput = () => {
      if (symptomInput.value) {
        symptomInput.value.focus();
      }
    };

    return {
      inputText,
      symptomInput,
      focusInput,
    };
  },
  emits: ['results'], 
  methods: {
    getInputValue() {
      return this.inputText;
    },
    async generateJson() {
  try {
    const response = await fetch('http://127.0.0.1:5000/api/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_input: [ this.inputText ] })
    });

    if (!response.ok) {
      console.error('Error status:', response.status);
      return;
    }

    // 正确地声明并赋值
    const result = await response.json();
    console.log('Prediction Result:', result);

    // 发出 results 事件，把后端返回的 result 传给父组件
    this.$emit('results', result);

  } catch (err) {
    console.error('Fetch error:', err);
  }
},
  },
};
</script>

<style scoped>
.symptom-input-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
  background-color: #f9faff;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
  font-family: 'Open Sans', sans-serif;
  width: 90%;
  max-width: 700px;
  margin: 20px auto;
}

.professional {
  /* 保持专业样式 */
}

.prompt-card {
  background-color: #fff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
  margin-bottom: 30px;
  text-align: center;
}

.elevated {
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
}

.icon {
  width: 40px;
  height: 40px;
  margin-bottom: 15px;
}

.info-icon {
  color: #64b5f6;
}

.prompt-title {
  font-size: 24px;
  font-weight: 600;
  line-height: 1.4;
  margin-bottom: 12px;
}

.primary-text {
  color: #2c3e50;
}

.prompt-description {
  font-size: 16px;
  line-height: 1.6;
  color: #7f8c8d;
  margin-bottom: 0;
}

.secondary-text {
  color: #546e7a;
}

.input-box {
  position: relative;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  cursor: text;
  width: 100%;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  margin-bottom: 25px; /* 为按钮留出空间 */
}

.focused-style:hover {
  border-color: #9ecae6;
}

.focused-style:focus-within {
  border-color: #64b5f6;
  box-shadow: 0 0 0 0.2rem rgba(100, 181, 246, 0.25);
}

textarea {
  width: 100%;
  min-height: 180px;
  padding: 20px;
  border: none;
  outline: none;
  box-sizing: border-box;
  font-size: 17px;
  color: #34495e;
  line-height: 1.7;
  resize: vertical;
  background-color: transparent;
}

textarea::placeholder {
  color: #95a5a6;
}

.input-label {
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 17px;
  color: #95a5a6;
  pointer-events: none;
  transition: all 0.2s ease-in-out;
}

.input-label.has-text {
  top: 8px;
  left: 12px;
  font-size: 12px;
  color: #7f8c8d;
  background-color: white;
  padding: 0 5px;
}

.hint-area {
  margin-top: 15px;
  text-align: center;
  color: #7f8c8d;
}

.hint-text {
  font-size: 14px;
  font-style: italic;
}

.subtle {
  color: #95a5a6;
}

.submit-button {
  background-color: #64b5f6; /* 亮蓝色按钮 */
  color: white;
  font-size: 16px;
  font-weight: 500;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  outline: none;
}

.submit-button:hover {
  background-color: #42a5f5;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.submit-button:active {
  background-color: #1e88e5;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
}

.primary-button {
  /* 可以根据主题调整按钮颜色 */
}

.additional-info {
  margin-top: 30px;
  text-align: center;
  color: #7f8c8d;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.small-icon {
  width: 16px;
  height: 16px;
  margin-right: 5px;
}

.light-blue {
  fill: #64b5f6;
}

.info-text {
  margin-bottom: 0;
}
</style>