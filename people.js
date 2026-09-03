// Name -> email lookup for Requesters and Buyers.
// To add or fix someone: just edit this object and redeploy — nothing
// else needs to change.
const PEOPLE = {
  "Mirza Arif": "m.arif@obeikan.com.sa",
  "Arafat Nasir": "a.nassir@obeikan.com.sa",
  "Birendra K. Nathun": "b.kumar@obeikan.com.sa",
  "Ronnel B. Agustin": "raugstin@obeikan.com.sa",
  "Srinivas Kistaiah": "s.oddi@obeikan.com.sa",
  "Amit Kumar S.Chandra": "a.kumar@obeikan.com.sa",
  "Mosaad Ragheb Mahmoud": "mosaad.m@obeikan.com.sa",
  "Nilesh Kulkarni": "k.nilesh@obeikan.com.sa",
  "Ahmed Mohamed Kamel": "a.kamel@obeikan.com.sa",
  "Talal Al Shamari": "s.talal@obeikan.com.sa",
  "Janartanam Dinakaran": "d.janartnam@obeikan.com.sa",
  "Abdenabi Bourhim": "b.abdenbi@obeikan.com.sa",
  "Subasankar Pillai": "s.pillai@obeikan.com.sa",
  "Kailas Arun": "a.kailash@obeikan.com.sa",
  "Ahmad Mohammed Mulla": "a.mulla@obeikan.com.sa",
  "Faisal Salem Alzahrani": "z.faisal@obeikan.com.sa",
  "Rahaf Khalid Alhaidi": "rahaf.alhaidi@obeikan.com.sa",
  "Abdulaziz Fahad Alali": "abdulaziz.fa@obeikan.com.sa",
  "Prabhakar": "p.bolisetti@obeikan.com.sa",
  "Ahmed Sabry Abdallah": "a.sabry@obeikan.com.sa",

  // Buyers
  "Abdul Haq Mohammed": "abdul.haq@obeikan.com.sa",
  "Abdulsamad Aboobakar": "samad.a@obeikan.com.sa",
  "Badr Hamed Al Harbi": "bader.j@obeikan.com.sa",
  "Mohammed Aseem": "m.aseem@obeikan.com.sa",
  "Nishad Mohammed Fazil": "m.nishad@obeikan.com.sa",
};

function normalizeName(name) {
  return (name || "").replace(/\s+/g, " ").trim();
}

// Requester values look like "C212190014 ~Mirza Arif" — strip the
// leading employee code and separator. Buyer values are already clean.
function stripEmployeeCode(raw) {
  if (!raw) return "";
  return normalizeName(raw.replace(/^[A-Za-z0-9]+\s*~\s*/, ""));
}

function lookupPerson(raw, { stripCode } = { stripCode: false }) {
  const clean = stripCode ? stripEmployeeCode(raw) : normalizeName(raw);
  let email = PEOPLE[clean];

  if (!email) {
    // Tolerate minor truncation/trailing-character mismatches rather
    // than showing nothing.
    const match = Object.keys(PEOPLE).find((k) => k.startsWith(clean) || clean.startsWith(k));
    if (match) email = PEOPLE[match];
  }

  if (!email) {
    console.warn("[Nawras PR Portal] no email on file for:", clean);
  }

  return { name: clean, email: email || null };
}

// Renders "Name" plus a mailto link on its own line, or just the name
// if no email is on file yet.
function personHtml(raw, { stripCode }) {
  const { name, email } = lookupPerson(raw, { stripCode });
  const safeName = escapeHtml(name);
  if (!email) return safeName || '<span class="muted">—</span>';
  return `${safeName}<br><a class="person-email" href="mailto:${escapeHtml(email)}">${escapeHtml(
    email
  )}</a>`;
}

function escapeHtml(value) {
  const div = document.createElement("div");
  div.textContent = value == null ? "" : String(value);
  return div.innerHTML;
}
