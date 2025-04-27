// Function to handle form submission
function handleFormSubmission(event) {
  event.preventDefault(); // Prevent the default form submission

  // Check if the "Agree to All Rules" checkbox is checked
  const agreeAllRules = document.getElementById('agreeAllRules');

  if (!agreeAllRules.checked) {
    alert('You must agree to all terms and conditions.');
    return false;
  }

  // Collect form data
  const formData = {
    discord: document.getElementById('discord').value,
    fivem: document.getElementById('fivem').value,
    characterName: document.getElementById('characterName').value,
    characterAge: document.getElementById('characterAge').value,
    experience: document.getElementById('experience').value,
    reason: document.getElementById('reason').value,
    vipPackage: document.getElementById('vipPackage').value,
    vipPrice: document.getElementById('vipPrice').value,
    packageDescription: document.getElementById('Package').value // New package description
  };

  // Send data to Discord webhook
  sendToDiscord(formData);
}

// Function to send data to Discord webhook
function sendToDiscord(formData) {
  const webhookUrl = 'https://discord.com/api/webhooks/1365960508628275210/oR4aN7PnGHlRA0wAUeYVQe__M8Q-xmENeqk_Hu44bR9C3dUhRfUyqR4HLb6a8kh7jLGU'; // Your provided webhook URL
  
  const payload = {
    embeds: [{
      title: "New VIP Application :tada:",
      color: 3447003, // Hex color for embed border (light blue)
      fields: [
        {
          name: "Discord Username :bust_in_silhouette:",
          value: formData.discord,
          inline: true
        },
        {
          name: "FiveM License or Discord ID :id:",
          value: formData.fivem,
          inline: true
        },
        {
          name: "Character's Name :guardsman:",
          value: formData.characterName,
          inline: true
        },
        {
          name: "Character's Age :calendar:",
          value: formData.characterAge,
          inline: true
        },
        {
          name: "Current Roleplay Job :briefcase:",
          value: formData.experience,
          inline: false
        },
        {
          name: "Reason for VIP Application :memo:",
          value: formData.reason,
          inline: false
        },
        {
          name: "VIP Package :package:",
          value: formData.vipPackage,
          inline: true
        },
        {
          name: "Price (€) :euro:",
          value: formData.vipPrice,
          inline: true
        },
        {
          name: "Package Description :clipboard:", // Added package description field
          value: formData.packageDescription,
          inline: false
        }
      ],
      footer: {
        text: "VIP Application received"
      },
      timestamp: new Date()
    }]
  };

  fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  .then(response => {
    if (response.ok) {
      alert('Application submitted successfully!');
      document.getElementById('vipForm').reset(); // Reset the form after successful submission
    } else {
      alert('Failed to submit application. Please try again.');
      document.getElementById('vipForm').reset(); // Reset form on error
    }
  })
  .catch(error => {
    console.error('Error sending data to Discord webhook:', error);
    alert('An error occurred. Please try again.');
    document.getElementById('vipForm').reset(); // Reset form on error
  });
}

// Initialize form behavior
function initializeForm() {
  const form = document.getElementById('vipForm');
  form.addEventListener('submit', handleFormSubmission);
}

// Initialize the form when the document is ready
document.addEventListener('DOMContentLoaded', initializeForm);
