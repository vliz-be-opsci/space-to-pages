# Context

* EMO BON = EMBRC Marine Omics Biodiversity Observation Network
* Environmental DNA (eDNA) metabarcoding is applied to samples taken at sea (either water or sediment)
* Species occurrences may be represented via RDF or DwC-A (species + location + time)

# Relating samples with observatories (Part I)

Relevant repositories:

* https://github.com/emo-bon/governance-data
* https://github.com/emo-bon/repo-constructor-action

Samples are taken by [observatories](https://github.com/emo-bon/governance-data/blob/main/observatories.csv). Each observatory has an observatory id and an ENA project accession number (predefined). All observatories are grouped under a single ENA umbrella project number (predefined) PRJEB51688.

A single observatory may be operated by multiple [organizations](https://github.com/emo-bon/governance-data/blob/main/organisations.csv), for example the observatory identified by BPNS is operated by Ghent University (UGENT), Flanders Marine Institute (VLIZ), Royal Belgian Institute of Natural Sciences (RBINS) and Katholieke Universiteit Leuven (KULeuven).

A single observatory may take multiple samples. Therefore, each observatory maintains a list of samples taken (Google Sheets), along with their unique identifier (sample id) and other relevant attributes. These spreadsheets are known as "logsheets" (cfr. https://github.com/emo-bon/governance-data/blob/main/logsheets.csv).

In order to manage the observatories' data on GitHub, a repository is automatically constructed for each observatory via a GitHub action, [repo-constructor-action](https://github.com/emo-bon/repo-constructor-action), acting on the governance-data repository. More specifically, this action reads the `logsheets.csv` file and generates a repository with these properties:

* observatory id (repository name becomes observatory-{observatory_id}-crate)
* Google Sheets URLs
* RO-Crate profile URI
* Downstream GitHub action workflow (see Part II)

The properties are eventually stored in the newly created repo under `./config/workflow_properties.yml`

# Relating samples with observatories (Part II)

Relevant repositories:

* https://github.com/emo-bon/observatory-bpns-crate
* https://github.com/emo-bon/observatory-profile

Once the observatory-{observatory_id}-crate repository is generated, a series of GitHub actions will be acting on it:

* [logsheet-downloader-action](https://github.com/emo-bon/logsheet-downloader-action): Downloads the spreadsheets from Google Sheets and stores them under the `./logsheets` folder, with each spreadsheet tab splitted out into a single CSV file. The download is scheduled to occur every 6 months.

* [data-quality-control-action](https://github.com/emo-bon/data-quality-control-action): Reads the `data_quality_control_threshold_date` from `./config/workflow_properties.yml` and runs a data quality control pipeline, repairing data where possible. Initially, the logsheets are filtered up to the threshold date and stored under `./logsheets-filtered`. Next, data rules and corresponding repairs are applied to the filtered data and the results are stored under `./logsheets-transformed`. Violations, errors and warnings are reported under `./data-quality-control`:
  
  * `dqc.csv`: Full list of data rule violations.
  * `logfile`: Full list of errors and warnings.
  * `report.csv`: Reduced list of data rule violations, with only the violations that can't be repaired automatically.

  Eventually, a GitHub issue is created, pointing the end user to the logfile and report.

* [rocrate-sembench-setup](https://github.com/vliz-be-opsci/rocrate-sembench-setup): Makes preparations for the next action, [semantify](https://github.com/vliz-be-opsci/semantify), by initializing a rocrate from a default profile if necessary and assembling the required files and variables into the `~sembench_data_cache` folder (i.e. files coming from the [observatory-profile](https://github.com/emo-bon/observatory-profile)) and `~sembench_kwargs.json` file, respectively. These steps are not handled by semantify, because we wanted to separate rocrate-specific logic from pysembench logic on a conceptual level. The utility files produced by this action and used by semantify are untracked via the `.gitignore`.

* _TODO_ [semantify](https://github.com/vliz-be-opsci/semantify):
  * generate ttl (with pysubyt task)
  * validate ttl (with pyshacl task)
  * generate ldes feed
  * create list of generated items for reuse by rocrate-validate

* _TODO: rocrate-validate_
  * validate
  * repair

* _TODO: rocrate-to-pages_

# Relating samples with sequencing runs

Relevant repositories:

* https://github.com/emo-bon/sequencing-data
* https://github.com/emo-bon/sequencing-profile

Samples coming from several observatories are aggregated into a single batch by EMBRC and are sent to Genoscope for DNA sequencing. A batch thus consists of a list of sample identifiers.

For each sample in the batch, an ENA sample accession number needs to be generated and immutably stored

Genoscope will upload the sequencing data under a run accession number below the given sample accession number

_TODO ..._

# Relating samples with species occurrences

_TODO_

* _metagoflow_
* _uses existing computational workflow profile_

# References

* European Marine Biological Resource Centre (EMBRC)
* Resource Description Framework (RDF)
* Darwin Core Archive (DwC-A)
* European Nucleotide Archive (ENA)
* Research Object Crate (RO-Crate)