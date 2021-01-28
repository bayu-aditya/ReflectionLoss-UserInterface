// const apiHost = "https://azwaradam.com/api"
const apiHost = "http://kvm1.weeber.id:5000/api"

export const apiUrl = {
  simulation: {
    data: apiHost + "/data/simulation",
    dataDownload: apiHost + "/data/simulation/download",
    calculate: apiHost + "/calculate/simulation",
    calculateWithData: apiHost + "/calculate/simulation-with-data"
  },
  experiment: {
    data: apiHost + "/data/experiment",
    dataDownload: apiHost + "/data/experiment/download",
    calculate: apiHost + "/calculate/experiment",
  }
}
