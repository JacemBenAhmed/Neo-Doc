<template>
  <div class="upload-container p-4 shadow rounded">
    <h4>Upload files</h4>
    <p>Select and upload the files of your choice</p>

    <!-- Input for file upload -->
    <div class="upload-box border rounded p-3 mb-3">
      <input
        type="file"
        class="form-control-file"
        @change="handleFileUpload"
        multiple
      />
    </div>

    <!-- File list display -->
    <div v-if="files.length > 0" class="file-list">
      <div
        v-for="(file, index) in files"
        :key="index"
        class="file-item d-flex align-items-center justify-content-between border p-2 mb-2"
      >
        <div class="file-info d-flex align-items-center">
          <span class="file-icon me-2">
            <i class="fa fa-file-pdf"></i>
          </span>
          <div>
            <p class="mb-0">{{ file.nomFichier }}</p>
            <small>{{ file.documentType }}</small>
          </div>
        </div>
        <div>
          <span v-if="file.uploading">Uploading...</span>
          <span v-if="file.completed" class="text-success">Completed</span>
        </div>
      </div>
    </div>

    <!-- Buttons to confirm submission or add demande -->
    <button class="btn btn-primary" @click="submitFiles" :disabled="!canSubmit">
      Confirm Submission
    </button>

    <button class="btn btn-primary mt-2" @click="addDemande" :disabled="!canSubmit">
      Add Demande
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      files: [], // Array to store uploaded files
    };
  },
  computed: {
    canSubmit() {
      return this.files.length > 0; // Enables buttons if there are files
    },
  },
  methods: {
    // Handles the file upload process
    handleFileUpload(event) {
      const uploadedFiles = event.target.files;
      for (let i = 0; i < uploadedFiles.length; i++) {
        const file = uploadedFiles[i];
        const newFile = {
          nomFichier: file.name,
          documentType: this.getDocumentType(file.type),
          uploading: true,
          completed: false,
        };
        this.files.push(newFile);

        // Simulate file upload completion
        setTimeout(() => {
          newFile.uploading = false;
          newFile.completed = true;
        }, 2000);
      }
      localStorage.setItem('uploadedFiles', JSON.stringify(this.files)); // Save files in local storage
    },
    // Determines the document type based on the MIME type
    getDocumentType(mimeType) {
      if (mimeType.includes('pdf')) return 'PDF';
      else if (mimeType.includes('jpeg') || mimeType.includes('png')) return 'Image';
      else if (mimeType.includes('mp4')) return 'Video';
      else return 'Unknown';
    },
    // Submits the files for further processing
    submitFiles() {
      console.log('Submitting files:', this.files);
      // Additional file submission logic here (API call, etc.)
    },
    // Redirects to the addDemande page
    addDemande() {
      localStorage.setItem('uploadedFiles', JSON.stringify(this.files)); // Ensure files are stored
      this.$router.push('/addDemande'); // Navigate to the "addDemande" route
    },
  },
  mounted() {
    // Load files from localStorage if they exist
    const storedFiles = localStorage.getItem('uploadedFiles');
    if (storedFiles) {
      this.files = JSON.parse(storedFiles);
    }
  },
};
</script>

<style scoped>
.upload-container {
  max-width: 400px;
  margin: 0 auto;
}

.upload-box {
  text-align: center;
  background-color: #f8f9fa;
}

.file-list {
  margin-top: 20px;
}

.file-item {
  background-color: #f8f9fa;
  border-radius: 8px;
}

.file-icon {
  font-size: 24px;
  color: #d9534f;
}

button {
  width: 100%;
  margin-top: 15px;
}
</style>
