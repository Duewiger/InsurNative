## OpenAI - simple API-Test
import openai

openai.api_key = "sk-proj-sYhsbiarMnoT8bd7DTvJT3BlbkFJAlato8hlnwKI9j5mHZL6"

response = openai.chat.completions.create(
    model="gpt-4",
    messages=[
        {"role": "user", "content": "Test"}
    ],
    max_tokens=100
)

print(response.choices[0].message.content.strip())