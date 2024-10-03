<template>
  <div class="upload-container p-4 shadow rounded">
    <h4 class="text-center mb-4">Upload Files</h4>
    <p class="text-center">Select and upload the files of your choice</p>

    <div class="upload-box border rounded p-3 mb-3">
      <input
        type="file"
        class="form-control"
        @change="handleFileUpload"
        multiple
      />
    </div>

    <!-- Display the list of selected files -->
    <div v-if="files.length > 0" class="file-list mt-3">
      <div
        v-for="(file, index) in files"
        :key="index"
        class="file-item row align-items-center justify-content-between border p-2 mb-2"
      >
        <div class="col-2 text-center">
          <!-- View Button -->
          <button class="btn btn-info btn-sm" @click="viewFile(file.fileObj)">
            View
          </button>
        </div>
        <div class="file-info col-6 col-md-8 d-flex align-items-center">
          <span class="file-icon me-2">
            <i class="fa fa-file-pdf fa-lg"></i>
          </span>
          <div class="file-details">
            <p class="mb-0">{{ file.nomFichier }}</p>
            <small>{{ file.documentType }}</small>
          </div>
        </div>
        <!-- Button to remove a file -->
        <div class="col-4 col-md-2 text-end">
          <button class="btn btn-danger btn-sm" @click="removeFile(index)">
            X
          </button>
        </div>
      </div>
    </div>

    <!-- Buttons for actions -->
    <div class="action-buttons mt-4 d-grid gap-2 d-sm-flex justify-content-sm-between">
      <button class="btn btn-primary" @click="submitFiles" :disabled="!canSubmit">
        Confirm Submission
      </button>

      <button class="btn btn-primary" @click="addDemande">
        Ajout Demande
      </button>

     
    </div>
  </div>
</template>

<script>
import documentService from '@/services/documentService.js';

export default {
  data() {
    return {
      files: [],
      documents: [],
    };
  },
  computed: {
    canSubmit() {
      return this.files.length > 0;
    },
  },
  methods: {
    handleFileUpload(event) {
      const uploadedFiles = event.target.files;
      for (let i = 0; i < uploadedFiles.length; i++) {
        const file = uploadedFiles[i];
        const newFile = {
          fileObj: file,
          nomFichier: file.name,
          documentType: this.getDocumentType(file.type),
          uploading: true,
          completed: false,
        };
        this.files.push(newFile);

        setTimeout(() => {
          newFile.uploading = false;
          newFile.completed = true;
        }, 2000);
      }
    },

    getDocumentType(mimeType) {
      if (mimeType.includes('pdf')) return 1;
      else if (mimeType.includes('jpeg') || mimeType.includes('png')) return 0;
      else if (mimeType.includes('mp4')) return 2;
      return 3;
    },

    removeFile(index) {
      this.files.splice(index, 1);
    },

    viewFile(file) {
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL, '_blank');
    },

    async submitFiles() {
      documentService.deleteAllDocuments();

      console.log('Submitting files:', this.files);
      for (const file of this.files) {
        const documentType = this.getDocumentType(file.fileObj.type);
        const fileObj = file.fileObj;

        try {
          const documentResponse = await documentService.createDocument(2060, documentType, fileObj);
          console.log('Document created successfully:', documentResponse);
          alert('Document uploaded successfully!');
        } catch (error) {
          console.error('Error creating document:', error.response?.data || error.message);
          alert('Failed!');
        }
      }
    },

    addDemande() {
      this.$router.push('/addDemande');
    },

    clearFiles() {
      this.files = [];
      this.documents = [];
    },

    async fetchDocuments() {
      try {
        const response = await documentService.getDocumentByID(2060);
        this.documents = Array.isArray(response.$values)
          ? response.$values.map(file => ({
              ...file,
              uploading: false,
              completed: true,
            }))
          : [];
      } catch (error) {
        console.error('Error fetching documents:', error.message);
      }
    },
  },
  mounted() {
    this.fetchDocuments();
  },
};
</script>

<style>
.upload-container {
  max-width: 100%;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

.upload-box {
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

.file-details {
  max-width: calc(100% - 40px);
}

button {
  width: 100%;
}

@media (min-width: 576px) {
  .btn {
    width: auto;
  }
}

@media (max-width: 576px) {
  .file-item {
    flex-direction: column;
    text-align: center;
  }

  .file-info {
    justify-content: center;
  }

  .action-buttons button {
    width: 100%;
  }
}
</style>
