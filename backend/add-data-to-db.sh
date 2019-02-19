echo "Importing data to database..."

sqlite3 -header sqlite_db <<EOF || exit 1
.mode tabs
.import ./files/decisions_1.csv decisions
.import ./files/decisions_2.csv decisions
.import ./files/decisions_3.csv decisions
.import ./files/decisions_4.csv decisions
.import ./files/decisions_5.csv decisions
.import ./files/decisions_6.csv decisions
.import ./files/decisions_7.csv decisions
.import ./files/decisions_8.csv decisions
.import ./files/decisions_9.csv decisions
EOF

echo "Importing data to database ended !"
