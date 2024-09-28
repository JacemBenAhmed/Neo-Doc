<template>
  <div class="upload-container p-4 shadow rounded">
    <h4>Upload files</h4>
    <p>Select and upload the files of your choice</p>

    <div class="upload-box border rounded p-3 mb-3">
      <input
        type="file"
        class="form-control-file"
        @change="handleFileUpload"
        multiple
      />
    </div>

    <div v-if="documents.length > 0" class="file-list">
      <div
        v-for="(file, index) in documents"
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

    <button class="btn btn-primary" @click="submitFiles" >
      Confirm Submission
    </button>

    <button class="btn btn-primary mt-2" @click="addDemande" >
      Add Demande
    </button>
    <button class="btn btn-primary mt-2" @click="clearFiles">Clear Docs</button>
  </div>
</template>

<script>
import documentService from '@/services/documentService.js';

export default {
  data() {
    return {
      files: [],
      documents: []
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

      localStorage.setItem('uploadedFiles', JSON.stringify(this.files.map(f => ({
        nomFichier: f.nomFichier,
        documentType: f.documentType,
        fileObj: f.fileObj,
        uploading: f.uploading,
        completed: f.completed
      }))));
    },

    getDocumentType(mimeType) {
      if (mimeType.includes('pdf')) return 1;
      else if (mimeType.includes('jpeg') || mimeType.includes('png')) return 0;
      else if (mimeType.includes('mp4')) return 2;
      else return 3;
    },

    async submitFiles() {
      console.log('Submitting files:', this.files);
      for (const file of this.files) {
        const documentTypes = this.getDocumentType(file.nomFichier);
        const fileObj = file.fileObj;

        if (!fileObj) {
          console.error('File object is missing for:', file);
          continue;
        }

        try {
          const documentResponse = await documentService.createDocument(2060, documentTypes, fileObj);
          console.log('Document created successfully:', documentResponse);
        } catch (error) {
          console.error('Error creating document:', error.response?.data || error.message);
        }
      }
    },

    addDemande() {
      localStorage.setItem('uploadedFiles', JSON.stringify(this.files));
      this.$router.push('/addDemande');
    },

    clearFiles() {
      this.documents = [];
      //localStorage.removeItem('uploadedFiles');
    },

    async fetchDocuments() {
      try {
        const response = await documentService.getDocumentByID(2060);
        console.log('API Response:', response);

        this.documents = Array.isArray(response.$values) ? response.$values.map(file => ({
          ...file,
          uploading: false,
          completed: true,
        })) : [];
      } catch (error) {
        console.error('Error fetching documents:', error.message);
      }

      console.log("files: ", this.documents);
    },
  },
  mounted() {
    this.fetchDocuments(); // Call fetchDocuments to get the documents on component mount

    const storedFiles = localStorage.getItem('uploadedFiles');
    if (storedFiles) {
      this.files = JSON.parse(storedFiles).map(f => ({
        ...f,
        uploading: false,
        completed: true,
      }));
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