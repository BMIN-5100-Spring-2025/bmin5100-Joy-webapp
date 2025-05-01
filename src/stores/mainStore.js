import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', () => {
  const statusOptions = Object.freeze({
    NONE: 'No Status',
    LOGGED_IN: 'Logged In',
    FILES_SELECTED: 'Files Selected',
    FILES_UPLOADED: 'Files Uploaded',
    PROCESSING: 'Processing',
    COMPLETED: 'Completed'
  });

  const selectedFiles = ref([])
  const status = ref(statusOptions.NONE)
  const selectedJobId =  ref("")
  const s3files = ref([])
  const downloadUrl = ref("")

  function hasFiles() {
    return selectedFiles.value.length > 0
  }

  function hasJobId() {
    return selectedJobId.value !== ""
  }

  function uniqueJobIds() {
    let jobs = new Set()
    for (let n in s3files.value) {
      const jobId = s3files.value[n].Key.split( '/' )
      jobs.add(jobId[0])
    }
    return jobs
  }

  function jobFiles() {
    let f = new Set()
    for (let n in s3files.value) {
      // const f = s3files.value[n].Key.split( '/' ).slice( 0, -1 ).join( '/' );
      console.log(s3files.value[n].Key)
      f.add(s3files.value[n].Key)
    }
    return f
  }

  return {
    statusOptions,
    selectedFiles,
    status, hasFiles,
    hasJobId,
    selectedJobId,
    s3files,
    uniqueJobIds,
    jobFiles,
    downloadUrl,
  }
})