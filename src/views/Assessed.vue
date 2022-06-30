<template>
  <div class="your-assessments">
    <div class="content">
      <p class="title">
        {{headerText}}
      </p>
      <p class="subtitle">
        {{subheaderText}} <span class="is-size-6">[Including blanks]</span>
      </p>
      <b-message>
      This page collects all the proposals that you assessed <b>within the pa-tool</b> and could be used to keep your assessments organized.<br /><br />
        Remember that you have to <b>copy-paste</b> each assessment in <b>IdeaScale</b> to officially submit them.<br /><br />
        This tool uses localStorage and cookies to store the progress of your work.<br />
        If you're using a setup where cookies are cleared at every browser launch, be careful because you may lose your work! You should export (download) the file, and re-import it every time or add a exception to your browser's settings.<br />
      </b-message>
    </div>
    <div class="content" v-if="assessedProposals.length === 0">
      <p class="subtitle">
        Import a backup
      </p>
      <b-field class="file is-primary">
        <b-upload v-on:input="readFile" drag-drop expanded accept=".csv">
          <section class="section">
            <div class="content has-text-centered">
              <p>
                <b-icon icon="upload" size="is-large" v-if="!csv"></b-icon>
              </p>
              <p>Drop your file here or click to upload</p>
            </div>
          </section>
        </b-upload>
      </b-field>
    </div>
    <div class="list content">
      <assessment-preview
        :key="proposal.id"
        v-for="proposal in assessedProposals"
        :proposal="proposal"
      />
    </div>
    <div class="content">
      <b-message class="buttons" v-if="assessedProposals.length > 0">
        <b-button icon-left="download" type="is-primary is-light" @click="exportAssessments">Export assessments</b-button>
        <b-button
          icon-left="delete" type="is-danger is-light"
          @click="confirmClear">Clear local database</b-button>
      </b-message>
    </div>
  </div>
</template>

<script>

import { mapGetters } from "vuex";
import proposals from '@/assets/data/f9/proposals.json'
import csvHeaders from "@/assets/data/import-csv-headers.json";

import downloadCsv from "@/utils/export-csv";
import pick from "@/utils/pick";
import AssessmentPreview from '@/components/AssessmentPreview'

export default {
  name: 'Assessed',
  components: {
    AssessmentPreview
  },
  data() {
    return {
      proposals: proposals,
      assessed: [],
      csv: null,
      csvHeaders: csvHeaders,
      goalAssPerProposal: 5
    }
  },
  computed: {
    ...mapGetters("assessments", ["ids", "indexed", "assessedCount"]),
    ...mapGetters("filters", ["totalCount", "totalProposals"]),
    assessedProposals() {
      return this.proposals.filter(p => (this.ids.indexOf(p.id) > -1))
        .map((p) => {
          return {...p, ...this.indexed[p.id]}
        })
    },
    headerText() {
      return `My Assessments (${this.assessedCount}/${this.totalProposals})`
    },
    subheaderText() {
      return `Total assessments submitted in IdeaScale (${this.totalCount}/${this.proposals.length * this.goalAssPerProposal})`
    }
  },
  methods: {
    importCsv() {
      if (this.csv) {
        if (this.csv.data) {
          this.$store.commit("assessments/setAssessments", this.csv.data);
        }
      }
    },
    readFile(file) {
      this.$papa.parse(file, {
        header: true,
        complete: this.onComplete,
        transform: this.transformData,
        transformHeader: this.transformHeader,
        skipEmptyLines: true
      });
    },
    onComplete(results) {
      results.data = results.data.map((el) => {
        return pick(el, Object.keys(this.csvHeaders))
      })
      this.csv = results;
      this.importCsv()
    },
    transformData(value, col) {
      if (this.csvHeaders[col]) {
        if (this.csvHeaders[col].type === 'integer') {
          return parseInt(value)
        }
        if (this.csvHeaders[col].type === 'boolean') {
          return (parseInt(value) > 0)
        }
        if (this.csvHeaders[col].type === 'array') {
          return value.split(',')
        }
        if (this.csvHeaders[col].type === 'string') {
          return value
        }
      } else {
        return value
      }
    },
    transformHeader(header) {
      const newHeaders = {}
      Object.keys(this.csvHeaders).forEach((h) => {
        newHeaders[this.csvHeaders[h].label] = h
      })
      if (newHeaders[header]) {
        return newHeaders[header]
      }
      return header
    },
    clear() {
      this.$store.commit("assessments/resetState");
    },
    confirmClear() {
      this.$buefy.dialog.confirm({
        title: 'Clear database',
        message: 'Are you sure you want to <b>clear</b> the local database? This action cannot be undone and you will lose your work.',
        confirmText: 'Clear Database',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          this.clear();
          this.$buefy.notification.open({
            message: 'Database cleared!',
            type: 'is-primary',
            position: 'is-bottom-right'
          })
        }
      })
    },
    exportAssessments() {
      const localAssessments = this.assessedProposals
      downloadCsv(localAssessments)
    }
  },
  mounted() {
  }
}
</script>


<style scoped lang="scss">
</style>
