export default {
  text: [
    '<p>Hold the CTRL key down to boot from a floppy...</p>',
    `<div class="blue-block">
      <p>COPYRIGHT 1993,1994 KHALFAOUI INTERNATIONL</p>
      <ul>
        <li>Maximum Overdrive (tm) (0,1)</li>
        <li>528 Million byte Drive Support (1)</li>
        <li>Custom Drive Type (1)</li>
      </ul>
    </div>`,
    '<p>Starting MS-DOS</p>',
    '<p>MIMEM is testing extended memory... </p>',
    `<div>
        <p>Microsoft Power Manager Version 1.00     CPQ</p>
        <p>Copyright Micorsoft Corporation 1986, 1992</p>
        <p>Copyright Compag Computer Corporation 1992</p>
      </div>`,
      `<div>
        <p>CD-ROM Device Drive Verision 4.12</p>
        <p>Copyright (C) Creative Techology Ltd, and</p>
        <p>Copyright (C) Matsuhita-Kotobuki Electroics Industires, Ltd.</p>
        <p>1990, 1991, 1992, 1993. All right reserved.</p>
        <p>Drive Name = AKH001</p>
        <p>Supporting the following units:</p>
          <p> unit: 0 id: 0 MATSUHITA CD-ROM CR-563-x 0.75</p>
        <p>1 CD-ROM drive(s) connected.</p>
        <p>CD-ROM device driver installed</p>
      </div>`,
      `
    <div>
    <p>Mouse Drive - Release 6.23                  Standard Version</p>
    <p>Copyright (C) 1984, 1993 Logitech Inc. All right reserved.</p>
    </div>`,
    `<div>
    <p>Reading LMOUSE.INI initialisation file…</p>
    <p>Searching for mouse…</p>
    </div>
    `,
    `<div>
    <p>C:\\>rem C:\\WINDOWS/\\\\WIN</p>
    <p>C:\\>LW /L:1,46576 C:\\DOS\\MSCDEX.EXE /D:MESCD001 /V /M:15</p>
    </div>`
  ],
  error: {
    value: '<p>MIMEM is testing extended memory... error.</p>'
  },
  success: {
    value: '<p>MIMEM is testing extended memory... </p>'
  },
  firstPhase: [
    '<p>Hold the CTRL key down to boot from a floppy...</p>',
    `<div class="blue-block">
      <p>COPYRIGHT 1993,1994 KHALFAOUI INTERNATIONL</p>
      <ul>
        <li>Maximum Overdrive (tm) (0,1)</li>
        <li>528 Million byte Drive Support (1)</li>
        <li>Custom Drive Type (1)</li>
      </ul>
    </div>`,
    '<p>Starting MS-DOS</p>',
    '<p>MIMEM is testing extended memory... </p>'
  ],
  loadState: {
    value: '<p>MIMEM is testing extended memory... </p>',
    done: '<p>MIMEM is testing extended memory... done.</p>',
    error: '<p>MIMEM is testing extended memory... error.</p>'

  },
  secondPhase: [
    `<div>
        <p>Microsoft Power Manager Version 1.00     CPQ</p>
        <p>Copyright Micorsoft Corporation 1986, 1992</p>
        <p>Copyright Compag Computer Corporation 1992</p>
      </div>`,
      `<div>
        <p>CD-ROM Device Drive Verision 4.12</p>
        <p>Copyright (C) Creative Techology Ltd, and</p>
        <p>Copyright (C) Matsuhita-Kotobuki Electroics Industires, Ltd.</p>
        <p>1990, 1991, 1992, 1993. All right reserved.</p>
        <p>Drive Name = AKH001</p>
        <p>Supporting the following units:</p>
          <p> unit: 0 id: 0 MATSUHITA CD-ROM CR-563-x 0.75</p>
        <p>1 CD-ROM drive(s) connected.</p>
        <p>CD-ROM device driver installed</p>
      </div>`,
      `
    <div>
    <p>Mouse Drive - Release 6.23                  Standard Version</p>
    <p>Copyright (C) 1984, 1993 Logitech Inc. All right reserved.</p>
    </div>`,
    `<div>
    <p>Reading LMOUSE.INI initialisation file…</p>
    <p>Searching for mouse…</p>
    </div>
    `,
    `<div>
    <p>C:\\>rem C:\\WINDOWS/\\\\WIN</p>
    <p>C:\\>LW /L:1,46576 C:\\DOS\\MSCDEX.EXE /D:MESCD001 /V /M:15</p>
    </div>`
  ]
}
